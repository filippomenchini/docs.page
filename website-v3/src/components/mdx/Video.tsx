import { useContext } from 'src/context';
import { getImagePath } from 'src/utils';

interface VideoProps extends React.ComponentProps<'video'> {
  src: string;
  type: string;
}

function Video(props: VideoProps) {
  const { source, baseBranch } = useContext();

  if (!props.src) {
    return <div />;
  }

  const { src, type, ...other } = props;

  return (
    <video {...other}>
      <source src={getImagePath(source, baseBranch, src)} type={type} />
    </video>
  );
}

export default Video;
