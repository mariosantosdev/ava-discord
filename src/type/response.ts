/**
 * Interface response when find a specific field
 */
export type ResponseSelectField = {
    prefix_redirect?: string[]
    channels_chat?: string[]
    channels_command?: string[]
    channel_welcome?: string
    welcome_message_status?: string
}

/**
 * Type response when get prefix in database
 */
export type ResponseGetPrefix = {
    prefix?: string
    prefixLength?: number
}