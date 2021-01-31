module.exports = function(eleventyConfig) {

    eleventyConfig.addLayoutAlias('default', 'base.njk');
    eleventyConfig.addPassthroughCopy("site/css");
    eleventyConfig.addPassthroughCopy("site/images");

    return {
        dir: {
            input: "site",
            layouts: "_layouts",
            output: "dist"
        }
    };
};