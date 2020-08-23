<?php

namespace App\Http\Controllers;

use App\Model\Category;
use App\Model\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // dd($request);
        $category = new Post;
        $category->category_id = json_encode($request->category);
        $category->title = $request->title;
        $category->description = $request->description;
        $category->save();
    }

    public function allData()
    {
        $category = Category::get();
        return response()->json($category);
    }

    public function allPostData()
    {
        $post = Post::get();

        // dump($post);

        $index= 0;
        foreach ($post as $items) {

            $array = [];
            foreach (json_decode($items->category_id) as $items2) {
                $catDetails = Category::select('title', 'description')
                        ->where("id", $items2)
                        ->first();

                // $post[$index]->catDetails = $catDetails;
                array_push($array, $catDetails);
            }
            $post[$index]->categoryDetails = $array;
            
            $index++;
        }

        // dd($category);
        return response()->json($post);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // dump($request, $id);
        Post::findOrFail($id)
            ->update([
                'title'=> $request->title,
                'description'=> $request->description,
                ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Post::where('id', $id)->delete();
    }
}
