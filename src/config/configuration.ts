export default () => ({
  port: parseInt(process.env.GATEWAY_PORT, 10) || 52718,
});
