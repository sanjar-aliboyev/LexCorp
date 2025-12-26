import { defineField, defineType } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    // 1. Internal Title (For Admin View)
    defineField({
      name: 'internalTitle',
      title: 'Internal Note (Admin only)',
      type: 'string',
      description: 'E.g., "Tax Audit 2025"'
    }),

    // 2. URL Slug
    defineField({
      name: 'slug',
      title: 'Slug (URL ID)',
      type: 'slug',
      options: {
        source: 'internalTitle',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    // 3. Main Image
    defineField({
      name: 'image',
      title: 'Main Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),

    // 4. Date & Author
    defineField({
      name: 'date',
      title: 'Publish Date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author Name',
      type: 'string',
      initialValue: 'ProLex Team'
    }),

    // 5. Multilingual Content Engine
    defineField({
      name: 'content',
      title: 'Multilingual Content',
      type: 'object',
      fields: ['UZ', 'RU', 'EN'].map((lang) => 
        defineField({
          name: lang,
          title: lang,
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Article Title', type: 'string' }),
            defineField({ 
              name: 'category', 
              title: 'Category', 
              type: 'string',
              options: {
                list: [
                  { title: 'Economic Cases', value: 'Economic Cases' },
                  { title: 'Civil Cases', value: 'Civil Cases' },
                  { title: 'Criminal Cases', value: 'Criminal Cases' },
                  { title: 'Corporate Law', value: 'Corporate Law' },
                  { title: 'Tax Issues', value: 'Tax Issues' },
                  { title: 'IT & Internet', value: 'IT & Internet' }
                ]
              }
            }),
            defineField({ name: 'excerpt', title: 'Short Description', type: 'text', rows: 3 }),
            // Rich Text Body
            defineField({ 
              name: 'body', 
              title: 'Full Article Body', 
              type: 'array', 
              of: [{ type: 'block' }] 
            })
          ]
        })
      )
    }),
  ],
  preview: {
    select: {
      title: 'internalTitle',
      media: 'image'
    }
  }
})