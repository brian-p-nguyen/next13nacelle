import { resolveFeaturedProducts } from './resolveFeaturedProducts';

export const resolvePageData = async ({ client, products, page }) => {
  try {
    const sections = await Promise.all(
      page?.fields?.sections?.map((section) => {
        switch (section.type) {
          case 'sectionFeaturedProducts':
            return resolveFeaturedProducts({
              client,
              section
            });
          default:
            return section;
        }
      })
    );
    return {
      products,
      page: {
        ...page,
        fields: { ...page.fields, sections }
      }
    };
  } catch {
    return { page, products: [] };
  }
};
