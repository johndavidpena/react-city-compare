const handleFocus = event => {
  console.log('handleFocus called');
  event.currentTarget.select();
};

export default handleFocus;
