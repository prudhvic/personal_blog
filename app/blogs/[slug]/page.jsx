import { client, urlFor } from "@/app/lib/config";

import { PortableText } from "next-sanity";
import Image from "next/image";
import toMarkdown from "@sanity/block-content-to-markdown";
import blocksToHyperScript from "@sanity/block-content-to-hyperscript";
import ButtonBack from "@/app/ButtonBack";
// import { PortableText } from "@portabletext/react";
async function getBlog(slug) {
  const query = `
    *[_type == "blog" && slug.current == '${slug}'] {
        "currentSlug": slug.current,
          title,
          content,
          titleImage
      }[0]`;
  let res = await client.fetch(query);
  return res;
}
const BlogPage = async ({ params }) => {
  let blog = await getBlog(params.slug);
  console.log(blog);

  return (
    <div className="container-blog">
      <ButtonBack />
      <section className="content">
        <h2>{blog.title}</h2>
        <Image
          src={urlFor(blog.titleImage).url()}
          width={400}
          height={400}
          alt="Title Image"
          priority
          className="rounded-lg mt-8 border"
        />
        <PortableText value={blog.content} />
      </section>
    </div>
  );
};
export default BlogPage;
