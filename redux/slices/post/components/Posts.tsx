"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../postSlice";

const Posts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const posts = useSelector((state) => state.posts);
  // console.log(posts.postList);

  return posts.fetchingPosts ? (
    <div>loading ...</div>
  ) : (
    <div>
      {posts.postList.map((post) => (
        <div key={post.id} className="p-5">
          {post.body}
        </div>
      ))}
    </div>
  );
};

export default Posts;
