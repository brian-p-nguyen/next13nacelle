import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

const contentfulUtils = {
  richText: (field) =>
    typeof field === 'string' ? field : documentToHtmlString(field),
  imageUrl: (image) => `https:${image.fields.file.url}`
};

export default contentfulUtils
