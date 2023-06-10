import contentfulClient from "@/app/services/contentfulClient";
import { getShopifyProduct} from "./getShopifyData";

// Remap shopify data to be used in product components
const transformContent = (content) =>  {
    // Update Sections
    content.sections = content.sections.map((section) => {
      section.type = section.sys.contentType.sys.id
      return section
    })
  
    // Add Fields
    content.fields = {
        features: content.features,
        sections: content.sections
    }
  
    // Clean up
    delete content.features;
    delete content.sections;
  
    return content
}

const resolveFeaturedProducts = async (section) => {
    try {
        // Get all Referenced Product IDs and Query Contentful to get product handles
        const productContentIDs =  section?.fields?.products.map(({ sys }) => sys.id)

        const referencedProducts = await contentfulClient.getEntries({
            content_type: 'partProduct',
            'sys.id[in]': productContentIDs.toString()
        })

        const productHandles = referencedProducts?.items.map((product) => {
            return product.fields.handle.split('::')[0]
        })
            
        // Get Referenced Product Data from Shopify by Product Handles
        let productList = await Promise.all(
            productHandles.map((handle) => getShopifyProduct(handle))
        );

        return {
        ...section,
        fields: {
            ...section?.fields,
            products: productList
        }
        };
    } catch (ex) {
        console.log(ex)
        return section;
    }
};

const resolvePageData = async (page) => {
    try {
      const sections = await Promise.all(
        page?.fields?.sections?.map((section) => {
          switch (section.type) {
            case 'sectionFeaturedProducts':
              return resolveFeaturedProducts(section);
            default:
              return section;
          }
        })
      );
      return {
        page: {
          ...page,
          fields: { ...page.fields, sections }
        }
      };
    } catch {
      return { page };
    }
  };

export const getContentfulData = async (handle) => {
    const contentfulData = await contentfulClient.getEntries({
      content_type: 'pageProduct',
      'fields.handle[like]': `page-${handle}`
    })

    const content = contentfulData.items[0].fields
    const transformedContent = transformContent(content)
    const { page: resolvedContent } = await resolvePageData(transformedContent);

    return resolvedContent
}
