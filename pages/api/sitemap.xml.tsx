import { axiosInstance } from "../../utils/axios";

const { SitemapStream, streamToPromise } = require("sitemap");
const { Readable } = require("stream");

const SiteMapApp = async (req, res) => {

  const posts = (await axiosInstance.get("api/controller/post/getpost")).data


  try {
    const smStream = new SitemapStream({
      hostname: `https://${req.headers.host}`,
      cacheTime: 600000,
    });

    // List of posts
    // const posts = [];

    // Create each URL row
    smStream.write({
      url: `/`,
      changefreq: 'daily',
      priority: 1.0
    });

    posts.forEach(post => {
      smStream.write({
        url: `/${post.slug}`,
        changefreq: 'daily',
        priority: 0.9
      });
    });

    // End sitemap stream
    smStream.end();

    // XML sitemap string
    const sitemapOutput = (await streamToPromise(smStream)).toString();

    // Change headers
    res.writeHead(200, {
      'Content-Type': 'application/xml'
    });

    // Display output to user
    res.end(sitemapOutput);
  } catch(e) {
    console.log(e)
    res.send(JSON.stringify(e))
  }
};

export default SiteMapApp;
