import {Navigate, useNavigate, useParams} from "react-router-dom";
import {useAppSelector} from "../../redux/hooks.ts";
import {useEffect, useRef, useState} from "react";
import React from 'react';
import axios from "../axios.ts";
import {PostType} from "../types.ts";

const AddPost = () => {
  const isAuth = useAppSelector(state => Boolean(state.auth.data));
  const inputFileRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();
  const isEdible = id;

  // Upload image to server and set its url into imageUrl
  const handleChangeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const formData = new FormData();

      if (!event.target.files) {
        return
      }

      const file = event.target.files[0];

      formData.append('image', file);

      const { data } = await axios.post('/upload', formData);

      setImageUrl(data.url);
    } catch (err) {
      console.warn(err);
    }
  }

  // Submit data to server
  const onSubmit = async () => {
    const fields = {
      title,
      text,
      tags: tags.replace(/\s/g, "").split(','),
      imageUrl,
    }

    const { data } = !isEdible
      ? await axios.post('/posts', fields)
      : await axios.patch(`/posts/${id}`, fields);

    const _id = isEdible ? id : data._id;

    navigate(`/posts/${_id}`)
  }

  // Update post logic
  useEffect(() => {
    if (id) {
      axios.get<PostType>(`/posts/${id}`)
        .then(({ data }) => {
          setTitle(data.title);
          setText(data.text);
          setTags(data.tags.join(', '));
          setImageUrl(data.imageUrl);
        })
    }
  }, [id]);

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to={"/"} />
  }

  return (
    <div className="mx-auto sm:max-w-2/3 md:max-w-1/2">
      <h2 className="mb-4 text-xl font-bold md:text-2xl md:mb-6">
        Add new post
      </h2>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <button onClick={() => inputFileRef.current?.click()} className="text-white bg-primary py-2 px-4 rounded-md hover:bg-blue-800">Choose an image</button>
          <input
            type="file"
            hidden
            ref={inputFileRef}
            onChange={handleChangeFile}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Enter the title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="text">
            Text
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="text"
            type="text"
            placeholder="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tags">
            Tags
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="tags"
            type="tags"
            placeholder="enter tags (with comma)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-primary hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={onSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPost;