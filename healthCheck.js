function healthCheck(serviceName) {
  if (!serviceName) {
    return "Service name missing";
  }

  return `Service ${serviceName} is running`;
}

module.exports = healthCheck;
