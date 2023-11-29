"use client";
import { useEffect } from "react";

import React from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Test() {
  const { data, error, isLoading } = useSWR(
    "http://10.1.114.43:3030/api/users",
    fetcher
  );

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";

  return (
    <div>
      {data.map((post) => (
        <div key={post._id}>
          <h1>{post.role}</h1>
          <p>{post.email}</p>
          <strong>👁 {post.name}</strong>
        </div>
      ))}
    </div>
  );
}
