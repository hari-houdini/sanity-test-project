import {
  DocumentDefinition,
  FieldDefinition,
  SanityDocument,
  SlugOptions,
  SlugSourceContext,
  StringOptions,
} from 'sanity'

const slugField = {
  type: 'slug',
  name: 'slug',
  group: 'config',
  options: {
    source: (document: SanityDocument, context: SlugSourceContext): string | Promise<string> => {
      const randomStr = Math.random().toString(36)
      if (Array.isArray(document?.title) && document.title.length > 0) {
        const enTitle =
          (document.title as Array<any>).find((localeTitle) => localeTitle?._key === 'en-US')
            ?.value || randomStr
        return enTitle
      }
      return randomStr
    },
    slugify: (input) => btoa(input.toLowerCase()),
  } satisfies SlugOptions,
  validation: (Rule) => Rule.required(),
} satisfies FieldDefinition<'slug'>

const title = {
  type: 'string',
  name: 'title',
  title: 'Headline',
  group: 'config',
  validation: (Rule) => Rule.required(),
} satisfies FieldDefinition<'string'>

const standfirst = {
  type: 'text',
  name: 'standfirst',
  group: 'config',
  validation: (Rule) => Rule.required(),
} satisfies FieldDefinition<'text'>

const alt = {
  type: 'string',
  name: 'alt',
  title: "'alt' Text",
  group: 'config',
} satisfies FieldDefinition<'string'>

const callToActionText = {
  type: 'string',
  name: 'callToActionText',
  description: 'The text that will appear on the button if this article is a featured article.',
  title: 'Call To Action Text',
  group: 'config',
} satisfies FieldDefinition<'string'>

const image = {
  type: 'image',
  name: 'poster',
  title: 'Poster',
  group: 'config',
  fields: [alt],
  validation: (Rule) => Rule.required(),
} satisfies FieldDefinition<'image'>

const featured = {
  title: 'Featured',
  name: 'featured',
  type: 'boolean',
  initialValue: false,
  options: {
    list: [
      {title: 'Yes', value: true},
      {title: 'No', value: false},
    ],
  },
} satisfies FieldDefinition<'boolean'>

const CATEGORIES = [
  {title: 'Events', value: 'events'},
  {title: 'Dev', value: 'dev'},
  {title: 'Lore', value: 'lore'},
  {title: 'Community', value: 'community'},
]

// Need to test
const categories = {
  type: 'string',
  name: 'category',
  title: 'Category',
  options: {
    list: CATEGORIES,
    layout: 'dropdown',
  } satisfies StringOptions,
  validation: (Rule) => Rule.required(),
} satisfies FieldDefinition<'string'>

const publishDateTime = {
  type: 'datetime',
  name: 'publishDateTime',
  title: 'Publish Date & Time',
  initialValue: new Date().toISOString(),
  validation: (Rule) => Rule.required(),
} satisfies FieldDefinition<'datetime'>

// Need to test
const arrayField = {
  type: 'array',
  name: 'arrayField',
  title: 'Array Field',
  of: [{type: 'string'}],
  validation: (Rule) => Rule.required(),
} satisfies FieldDefinition<'array'>

// Need to test
const blockField = {
  type: 'array',
  name: 'blockField',
  title: 'Block Field',
  of: [{type: 'block'}],
  validation: (Rule) => Rule.required(),
} satisfies FieldDefinition<'array'>

const movieDocField = {
  title: 'Movie',
  name: 'movie',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Poster',
      name: 'poster',
      type: 'image',
    },
    {
      title: 'Directors',
      name: 'directors',
      type: 'array',
      of: [{type: 'string'}],
    },
  ],
}

const fileField = {
  title: 'Manuscript',
  name: 'manuscript',
  type: 'file',
  fields: [
    {
      name: 'description',
      type: 'string',
      title: 'Description',
    },
    {
      name: 'author',
      type: 'reference',
      title: 'Author',
      to: {type: 'haritest'},
    },
  ],
}

const geoPointField = {
  title: 'Launchpad Location',
  name: 'location',
  type: 'geopoint',
}

const numberField = {
  title: 'Current popularity',
  name: 'popularity',
  type: 'number',
}

const objField = {
  title: 'Address',
  name: 'address',
  type: 'object',
  fields: [
    {
      name: 'street',
      type: 'string',
      title: 'Street name',
    },
    {
      name: 'streetNo',
      type: 'string',
      title: 'Street number',
    },
    {name: 'city', type: 'string', title: 'City'},
  ],
}

const urlField = {
  title: 'Image URL',
  name: 'imageUrl',
  type: 'url',
}

export const hariCollection: DocumentDefinition = {
  type: 'document',
  name: 'haricollection',
  title: 'Hari Collection',
  options: {
    collapsible: true,
  },
  groups: [
    {
      title: 'Config',
      name: 'config',
    },
    {
      title: 'Content',
      name: 'content',
    },
    {
      title: 'SEO',
      name: 'seo',
    },
    {
      title: 'Metadata',
      name: 'meta',
    },
  ],
  fields: [
    slugField,
    title,
    standfirst,
    image,
    featured,
    categories,
    publishDateTime,
    callToActionText,
    arrayField,
    blockField,
    movieDocField,
    fileField,
    geoPointField,
    numberField,
    objField,
    urlField,
  ],
  initialValue: {
    title: '',
    standfirst: '',
    poster: {
      alt: '',
    },
    callToActionText: '',
  },
  preview: {
    select: {
      title: 'title',
      media: 'poster',
      standfirst: 'standfirst',
    },
    prepare(selection, ...args) {
      const {title, standfirst, media} = selection

      return {
        title,
        standfirst,
        media,
      }
    },
  },
}
