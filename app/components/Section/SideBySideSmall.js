import Image from 'next/image';
import Link from 'next/link';
import contentfulUtils from '../../services/contentfulUtils';

const SideBySideFull = ({ content }) => {
  return (
    content && (
      <section className="relative bg-white pt-4">
        <div className="">
          <div
            className={`
            relative h-56 
          `}
          >
            <Image
              src={contentfulUtils.imageUrl(content.fields.image)}
              alt={content.fields.imageAlt}
              quality={80}
              fill
              sizes="100vw"
              style={{
                objectFit: 'cover'
              }}
            />
          </div>
        </div>
        <div
          className="
          relative
          pt-6
          pb-6
          px-4
        "
        >
          <div>
            <div className={`text-base max-w-prose mx-auto`}>
              {content.fields.subheading && (
                <h2
                  className="
                  leading-6
                  text-indigo-600
                  font-semibold
                  tracking-wide
                  text-sm
                  "
                >
                  {content.fields.subheading}
                </h2>
              )}
              {content.fields.heading && (
                <h3
                  className="
                  mt-2
                  leading-6
                  font-extrabold
                  tracking-tight
                  text-gray-800
                  text-lg
                  "
                >
                  {content.fields.heading}
                </h3>
              )}
              {content.fields.text && (
                <div
                  className="mt-4 text-md text-gray-500"
                  dangerouslySetInnerHTML={{
                    __html: contentfulUtils.richText(content.fields.text)
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    )
  );
};

export default SideBySideFull;
