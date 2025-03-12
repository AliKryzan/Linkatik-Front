import { Badge, Group, Tooltip } from "@mantine/core"
import { Calendar, Lock, Mail, ShieldAlert } from "lucide-react"

/**
 * Component to display lock indicators for a block
 * Shows icons for each enabled lock option
 */
const LockIndicator = ({ lockOptions }) => {
  if (!lockOptions) return null

  const {
    show_with_code,
    show_with_birthday,
    show_with_subscribe,
    show_with_sensitive_content
  } = lockOptions

  // If no lock options are enabled, don't render anything
  if (!show_with_code && !show_with_birthday && !show_with_subscribe && !show_with_sensitive_content) {
    return null
  }

  return (
    <Group spacing="xs" position="right" className="lock-indicators">
      {show_with_code && (
        <Tooltip label="Requires passcode" position="top">
          <Badge 
            size="sm" 
            variant="light" 
            color="blue"
            className="lock-badge"
            leftSection={<Lock size={12} />}
          >
            Code
          </Badge>
        </Tooltip>
      )}
      
      {show_with_birthday && (
        <Tooltip label="Age restricted" position="top">
          <Badge 
            size="sm" 
            variant="light" 
            color="green"
            className="lock-badge"
            leftSection={<Calendar size={12} />}
          >
            Age
          </Badge>
        </Tooltip>
      )}
      
      {show_with_subscribe && (
        <Tooltip label="Requires subscription" position="top">
          <Badge 
            size="sm" 
            variant="light" 
            color="violet"
            className="lock-badge"
            leftSection={<Mail size={12} />}
          >
            Sub
          </Badge>
        </Tooltip>
      )}
      
      {show_with_sensitive_content && (
        <Tooltip label="Sensitive content" position="top">
          <Badge 
            size="sm" 
            variant="light" 
            color="red"
            className="lock-badge"
            leftSection={<ShieldAlert size={12} />}
          >
            18+
          </Badge>
        </Tooltip>
      )}
    </Group>
  )
}

export default LockIndicator