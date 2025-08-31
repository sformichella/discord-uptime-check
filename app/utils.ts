import { GetUptimeCheckMessageArgs } from "./types";

const getUptimeCheckMessage = (args: GetUptimeCheckMessageArgs) => {
  const {
    currentStatus,
    repeatFailureMessageInterval,
    previousMessage
  } = args

  if (!previousMessage) {
    if (currentStatus === 'failure') {
      return 'Uptime check failed.'
    } else {
      return 'Uptime check succeeded.'
    }
  }

  if (currentStatus === previousMessage.status) {
    if (currentStatus === 'failure') {
      const now = Date.now()

      if (now - previousMessage.sentAt > repeatFailureMessageInterval) {
        return 'Uptime check is still failing.'
      }
    } else {
      return
    }
  }

  if (currentStatus === 'failure') {
    return 'Status changed. Uptime check failed.'
  } else {
    return 'Status changed. Uptime check succeed.'
  }
}

export {
  getUptimeCheckMessage
}
