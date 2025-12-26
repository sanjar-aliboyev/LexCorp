import { defineField, defineType } from 'sanity'

export const videoType = defineType({
  name: 'video',
  title: 'YouTube Video',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Video Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'YouTube URL',
      type: 'url',
      description: 'e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'url'
    }
  }
})