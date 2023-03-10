import { Head } from "$fresh/runtime.ts";
import { Button } from "../components/Button.jsx";
import GithubIcon from "../icons/GithubIcon.jsx";
import { getTemplates } from "../lib/api.js";
import urlForImage from "../lib/urlForImage.js";

import { baseStyles } from "../styles/baseStyles.js";
import { homeStyles } from "../styles/homeStyles.js";

export const handler = {
  async GET(_req, ctx) {
    const templates = await getTemplates();
    return ctx.render(templates);
  },
};

export default function Home(props) {
  return (
    <>
      <Head>
        <title>Fresh + Sanity Demo</title>
        <meta name="description" content="Fresh + Sanity Demo" />
        <style>
          {baseStyles}
          {homeStyles}
        </style>
      </Head>
      <div className="home-hero__container">
        <div className="home-hero__text">
          <h1>Fresh + Sanity</h1>
          <p>
            This page is built with <a href="https://fresh.deno.dev">Fresh</a>
            {" "}
            🍋 and the content is pulled from a{" "}
            <a href="https://sanity.io">Sanity</a> project
          </p>
          <p>
            <Button href="https://github.com/littlesticks/fresh-sanity">
              View Source{" "}
              <span class="btn__icon">
                <GithubIcon />
              </span>
            </Button>
          </p>
        </div>
        <ul>
          {props.data.map((template, index) => (
            <li class="home-template__item" key={template.id}>
              <a
                href={`https://littlesticks.dev/templates/${template.seo.slug.current}`}
              >
                <picture>
                  <source
                    srcSet={urlForImage(template.featuredImage).format("webp").width(600).url()} type="image/webp" />
                  <img
                    src={urlForImage(template.featuredImage).width(600).url()} loading={index < 3 ? 'eager' : 'lazy'} alt={`Preview of ${template.title} by Little Sticks`} width="376" height="212"
                  />
                </picture>
                <h2>{template.title}</h2>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
