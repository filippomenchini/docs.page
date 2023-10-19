import { useContext } from 'src/context';
import { getImagePath } from 'src/utils';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  zoom?: boolean;
  caption?: string;
}

const Image: React.FC<ImageProps> = props => {
  const { config, source, baseBranch } = useContext();
  const src = getImagePath(source, baseBranch, props.src ?? '');
  const { width, height, ...other } = props;

  const zoom = Boolean(props.zoom) || config.zoomImages;

  return (
    <figure>
      <img
        {...other}
        data-zoom={`${zoom}`}
        src={src}
        loading="lazy"
        className="mx-auto"
        style={{
          width: width ? parseInt(width.toString()) : 'inherit',
          height: height ? parseInt(height.toString()) : 'inherit',
        }}
      />
      {!!props.caption && <figcaption className="text-center">{props.caption}</figcaption>}
    </figure>
  );
};

export default Image;
