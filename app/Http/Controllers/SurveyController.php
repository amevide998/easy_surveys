<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSurveyRequest;
use App\Http\Requests\UpdateSurveyRequest;
use App\Http\Resources\SurveyResource;
use App\Models\Survey;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;

class SurveyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        $user = $request->user();
        return SurveyResource::collection(Survey::where('user_id', $user->id)->paginate());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSurveyRequest $request)
    {
        //
        $req = $request->validated();

        if($req['image'] !== 'null'){
            $image_url = $this->saveImage($req['image']);
            $req['image'] = $image_url;
        }

        $result = Survey::create($req);
        return new SurveyResource($result);

    }

    /**
     * Display the specified resource.
     */
    public function show(Survey $survey, Request $request)
    {
        $user = $request->user();
        if($survey->user_id !== $user->id){
            return abort(403, 'Unauthorized action');
        }
        return new SurveyResource($survey);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSurveyRequest $request, Survey $survey)
    {
        //
        $data = $request->validated();

        if(isset($data['image']) && ($data['image'] !== URL::to($survey->image))){
            $image_url = $this->saveImage($data['image']);
            $data['image'] = $image_url;

            //  if there is an old image, delete it
            if($survey->image){
                $absolutePath = public_path($survey->image);
                File::delete($absolutePath);
            }
        }

        $survey->update($data);
        return new SurveyResource($survey);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Survey $survey, Request $request)
    {
        //
        $user = $request->user();
        if($survey->user_id !== $user->id){
            return abort(403, 'unauthorized action');
        }

        if($survey->image){
            $absolutePath = public_path($survey->image);
            File::delete($absolutePath);
        }

        $survey->delete();
        return response('', 204);
    }

    private function saveImage($image){
        if(preg_match('/^data:image\/(\w+);base64,/', $image, $type)){
            $image = substr($image, strpos($image, ',') + 1);

            $type = strtolower($type[1]);

            // check if type is valid image
            if(!in_array($type, ['jpg', 'jpeg', 'gif', 'png'])){
                throw new \Exception('invalid image type');
            }

            $image = str_replace(' ', '+', $image);
            $image = base64_decode($image);

            if($image === false){
                throw  new \Exception('base64 decode failed');
            }

        }else{
            throw new \Exception('didnt match data uri with image data');
        }

        $dir = 'images/';
        $file = Str::random() . '.' . $type;
        $absolutePath = public_path($dir);
        $relativePath = $dir .  $file;

        if(!File::exists($absolutePath)){
            File::makeDirectory($absolutePath, 0755, true);
        }

        file_put_contents($relativePath, $image);

        return $relativePath;
    }
}
