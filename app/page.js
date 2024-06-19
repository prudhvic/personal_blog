import Image from "next/image";
import { client, urlFor } from "./lib/config";
import Link from "next/link";
export const revalidate = 10;
async function getBlogs() {
  let query = `*[_type=="blog"]{
  titleImage,
    smallDescription,
    _createdAt,
    title,
    "slug":slug.current
    
}`;
  let res = await client.fetch(query);
  console.log(res);
  return res;
}
export default async function Home() {
  let blogs = await getBlogs();
  return (
    <main>
      <div className="blogs">
        {blogs.map((blog) => (
          <article key={blog.slug}>
            <h2 className="title">{blog.title}</h2>
            <Image
              src={urlFor(blog.titleImage).url()}
              width={300}
              height={300}
              quality={100}
            />
            <p className="desc">{blog.smallDescription}</p>
            <Link className="read_more" href={`/blogs/${blog.slug}`}>
              Read More...
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
