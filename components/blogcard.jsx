"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import styles from "@/components/blogcard.module.css";
// @ts-ignore

// @ts-ignore

export default function BlogCard({ post, slug = "" }) {
  let bounds;
  const inputRef = useRef();
  const [mouseLeft, setMouseLeft] = useState(false);

  const rotateToMouse = (e) => {
    if (mouseLeft) return; // Check if mouse left before updating style
    bounds = inputRef.current.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const leftX = mouseX - bounds.x;
    const topY = mouseY - bounds.y;
    const center = {
      x: leftX - bounds.width / 2,
      y: topY - bounds.height / 2,
    };
    const distance = Math.sqrt(center.x ** 2 + center.y ** 2);
    inputRef.current.style.transform = `
      scale3d(1.07, 1.07, 1.07)
      rotate3d(
        ${center.y / 100},
        ${-center.x / 100},
        0,
        ${Math.log(distance) * 2}deg
      )
    `;
  };

  const removeListener = (e) => {
    setMouseLeft(true);
    inputRef.current.style.transform = "";
    inputRef.current.style.background = "";
  };

  const addListener = (e) => {
    setMouseLeft(false);
  };

  useEffect(() => {});

  return (
    <>
      <Link href={{ pathname: `/blog/${post.slug || slug}` }}>
        <div className="block md:hidden">
          <article
            className={
              "flex flex-col gap-8 border-black border-2 rounded-lg p-10 " +
              styles.card
            }
          >
            <div>
              {post.frontMatter.title} - {post.frontMatter.description}
            </div>
            <p className="w-10/12 break-words">
              [{" "}
              {post.frontMatter.tags &&
                post.frontMatter.tags.map((tag) => {
                  return (
                    <span className="p-1" key={tag}>
                      {tag}
                    </span>
                  );
                })}{" "}
              ]
            </p>
          </article>
        </div>
      </Link>

      <Link href={{ pathname: `/blog/${post.slug || slug}` }}>
        <div
          className={styles.cardParent + " hidden md:block"}
          onMouseLeave={removeListener}
          onMouseEnter={addListener}
        >
          <article
            ref={inputRef}
            className={
              "flex flex-col gap-8 border-black border-2 rounded-lg p-10 " +
              styles.card
            }
            onMouseMove={rotateToMouse}
          >
            <div>
              {post.frontMatter.title} - {post.frontMatter.description}
            </div>
            <p className="flex flex-row gap-6">
              [{" "}
              {post.frontMatter.tags &&
                post.frontMatter.tags.map((tag) => {
                  return <span key={tag}>{tag}</span>;
                })}{" "}
              ]
            </p>
          </article>
        </div>
      </Link>
    </>
  );
}
