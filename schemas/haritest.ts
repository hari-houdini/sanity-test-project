import {DocumentDefinition, FieldDefinition} from 'sanity'

const legal = {
  type: 'string',
  name: 'legal',
  title: 'Legal Statement',
  group: 'content',
} satisfies FieldDefinition<'string'>

export const hariTest: DocumentDefinition = {
  type: 'document',
  name: 'haritest',
  title: 'Hari Test',
  groups: [
    {
      title: 'Content',
      name: 'content',
    },
  ],
  fields: [legal],
  preview: {
    prepare() {
      return {
        title: 'Hari Test',
      }
    },
  },
}
