// import React from "react";
// import useBlogStore from "@/store/blogStore";
// import useBookmarkStore from "@/store/bookmarkStore";
// import { Link } from "react-router-dom";
// import { useEffect } from "react";

// function Bookmarked() {
//   const { bookmarks, fetchBookmarks } = useBookmarkStore();

//   useEffect(() => {
//     fetchBookmarks();
//   }, [fetchBookmarks]);
//   console.log(bookmarks);

//   const { getBlogById } = useBlogStore();

//   return (
//     <div className="container mx-auto px-4 py-8 mt-24">
//       <h1 className="text-3xl font-bold text-center mb-6">Bookmarked Blogs</h1>
//       {bookmarks.length === 0 ? (
//         <p className="text-center text-gray-500">You have no bookmarks yet.</p>
//       ) : (
//         <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//           {bookmarks.map((id) => {
//             const blog = getBlogById(id);
//             return (
//               <div
//                 key={id}
//                 className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
//               >
//                 <h2 className="text-xl font-semibold mb-2">{blog?.title}</h2>
//                 <p className="text-sm text-gray-600 mb-4">
//                   {blog?.content?.slice(0, 100)}...
//                 </p>
//                 <Link
//                   to={`/blog/view/${id}`}
//                   className="text-blue-600 hover:underline"
//                 >
//                   View Blog
//                 </Link>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Bookmarked;



// import React, { useEffect } from "react";
// import useBookmarkStore from "@/store/bookmarkStore";
// import { Link } from "react-router-dom";

// function Bookmarked() {
//   const { bookmarks, fetchBookmarks } = useBookmarkStore();

//   useEffect(() => {
//     fetchBookmarks(); // Fetch bookmarks when the component mounts
//   }, [fetchBookmarks]);

//   console.log(bookmarks); // This will show the full blog data

//   return (
//     <div className="container mx-auto px-4 py-8 mt-24">
//       <h1 className="text-3xl font-bold text-center mb-6">Bookmarked Blogs</h1>
//       {bookmarks.length === 0 ? (
//         <p className="text-center text-gray-500">You have no bookmarks yet.</p>
//       ) : (
//         <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//           {bookmarks.map((blog) => (
//             <div
//               key={blog.id}
//               className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
//             >
//               <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
//               <p className="text-sm text-gray-600 mb-4">
//                 {blog.content.slice(0, 100)}...
//               </p>
//               <Link
//                 to={`/blog/view/${blog.id}`}
//                 className="text-blue-600 hover:underline"
//               >
//                 View Blog
//               </Link>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Bookmarked;


import React, { useEffect } from "react";
import useBookmarkStore from "@/store/bookmarkStore";
import { Link } from "react-router-dom";

function Bookmarked() {
  const { bookmarks, fetchBookmarks } = useBookmarkStore();

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  return (
    <div className="container mx-auto px-4 py-8 mt-24">
      <h1 className="text-3xl font-bold text-center mb-6">Bookmarked Blogs</h1>
      {bookmarks.length === 0 ? (
        <p className="text-center text-gray-500">You have no bookmarks yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {bookmarks.map((blog) => (
            <div
              key={blog.id}
              className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
            >
              <h2 className="text-xl font-semibold mb-2">{blog.title || "Untitled Blog"}</h2>
              <p className="text-sm text-gray-600 mb-4">
                {blog.content ? blog.content.slice(0, 100) + "..." : "No content available."}
              </p>
              <Link
                to={`/blog/view/${blog.id}`}
                className="text-blue-600 hover:underline"
              >
                View Blog
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Bookmarked;
