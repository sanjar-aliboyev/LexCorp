import { postType } from './post'
import { successCaseType } from './successCase'
import { videoType } from './video' // <--- Import this

// We removed 'leadType' from here
export const schemaTypes = [postType, successCaseType, videoType]