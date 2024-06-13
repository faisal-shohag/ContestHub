import PropTypes from 'prop-types';

const ProgressWindow = ({progressbar}) => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-svh">
        <img
          className="h-[100px] w-[100px] animate-ping"
          src="https://i.postimg.cc/XYSGZD9T/logo.png"
        />
        <div className="font-bold text-2xl mt-2">Contest Hub</div>
        <center>{progressbar}</center>
        <div>Please wait...</div>
      </div>
    </div>
  );
};

ProgressWindow.propTypes = {
  progressbar: PropTypes.node.isRequired,
};

export default ProgressWindow;
