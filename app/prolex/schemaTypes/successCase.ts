import { defineField, defineType } from 'sanity'

export const successCaseType = defineType({
  name: 'successCase',
  title: 'Success Case',
  type: 'document',
  fields: [
    defineField({
      name: 'internalTitle',
      title: 'Internal Note (Admin only)',
      type: 'string',
      description: 'E.g., "Samsung Tax Dispute"'
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL ID)',
      type: 'slug',
      options: { source: 'internalTitle', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Practice Area',
      type: 'string',
      options: {
        list: [
          { title: 'Corporate Law', value: 'corporate' },
          { title: 'Litigation', value: 'litigation' },
          { title: 'Tax & Customs', value: 'tax' },
          { title: 'Intellectual Property', value: 'ip' },
          { title: 'Labor Law', value: 'labor' },
          { title: 'Construction', value: 'construction' }
        ]
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'statValue',
      title: 'Key Stat / Result (Optional)',
      type: 'string',
      description: 'E.g., "$1.5M Saved" or "Acquitted"'
    }),
    defineField({
      name: 'image',
      title: 'Case Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'content',
      title: 'Multilingual Details',
      type: 'object',
      fields: ['UZ', 'RU', 'EN'].map((lang) => 
        defineField({
          name: lang,
          title: lang,
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Case Title', type: 'string' }),
            defineField({ name: 'description', title: 'Summary (Card Text)', type: 'text', rows: 3 }),
            defineField({ 
              name: 'body', 
              title: 'Full Case Study', 
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
      subtitle: 'category',
      media: 'image'
    }
  }
})