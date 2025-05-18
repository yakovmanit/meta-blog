import {Navigate, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/hooks.ts";
import {useEffect, useRef, useState} from "react";
import React from 'react';
import axios from "../axios.ts";
import {fetchAuthMe} from "../../redux/slices/authSlice.ts";

const UserEdit = () => {
  const isAuth = useAppSelector(state => Boolean(state.auth.data));
  const currentUser = useAppSelector(state => state.auth.data);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const [fullName, setFullName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [description, setDescription] = useState('');

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

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

      setAvatarUrl(data.url);
    } catch (err) {
      console.warn(err);
    }
  }

  // Submit data to server
  const onSubmit = async () => {
    const fields = {
      fullName,
      avatarUrl,
      description,
    }

    await axios.patch(`/auth/edit`, fields);

    dispatch(fetchAuthMe());

    navigate('/account')
  }

  useEffect(() => {
    if (currentUser) {
      setFullName(currentUser.fullName);
      setDescription(currentUser.description);
      setAvatarUrl(currentUser.avatarUrl);
    }
  }, [currentUser]);

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to={"/"} />
  }

  return (
    <div className="mx-auto w-full sm:max-w-2/3 md:max-w-1/2">
      <h2 className="mb-4 text-xl font-bold md:text-2xl md:mb-6">
        Edit your info
      </h2>
      {avatarUrl && (
        <div className="mb-4">
          <img src={`http://localhost:4444${avatarUrl}`} alt="Avatar Preview" className="w-32 h-32 rounded-full object-cover" />
        </div>
      )}

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <button onClick={() => inputFileRef.current?.click()} className="text-white bg-primary py-2 px-4 rounded-md hover:bg-blue-800">Choose an avatar</button>
          <input
            type="file"
            hidden
            ref={inputFileRef}
            onChange={handleChangeFile}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Enter the username"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            type="text"
            placeholder="Enter the description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-primary hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={onSubmit}
          >
            Change
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserEdit;