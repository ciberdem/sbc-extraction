const axios = require('axios');
const cheerio = require('cheerio');

function isCrawlLinkOptions(options) {
    return typeof options.url === 'string';
}

function extractUrls(holder, convert) {
    const urls = [];
    holder.each((index, element) => {
        let url = convert ? convert(element.attribs.href) : element.attribs.href;
        urls.push(url);
    });
    return urls;
}

function generateConfig(url, selector, waitFor) {
    let config = {
        target: url,
        fetch: {
            urls: {
                listItem: selector,
                data: {
                    url: {
                        attr: 'href',
                    },
                },
            },
        },
    };
    waitFor && (config = Object.assign(config, { waitFor }));
    return config;
}

async function resolve(options, waitFor) {
    let urls = [];
    let data;
    if (isCrawlLinkOptions(options)) {
        const { url, iterator, fetch } = options;
        if (typeof iterator === 'string') {
            const response = await axios.get(url);
            const $ = cheerio.load(response.data);
            const selector = iterator;
            urls = extractUrls($(selector), null);
        } else {
            const { selector, convert } = iterator;
            const response = await axios.get(url);
            const $ = cheerio.load(response.data);
            urls = extractUrls($(selector), convert);
        }
        data = fetch ? await axios.get(url, fetch) : undefined;
    } else {
        urls = options;
        data = undefined;
    }
    return [urls, data];
}

async function crawlAll(urls, fetch, data, waitFor) {
    const results = [];
    for (let i = 0; i < urls.length; i++) {
        let config = {
            target: urls[i],
            fetch: fetch(data, i, urls[i]),
        };
        waitFor && (config = Object.assign(config, { waitFor }));
        results.push(await resolve(config, waitFor));
    }
    return results;
}

async function crawl(config) {
    const { target, waitFor, fetch } = config;
    const [urls, data] = await resolve(target, waitFor);
    return crawlAll(urls, fetch, data, waitFor);
}

module.exports = crawl;

