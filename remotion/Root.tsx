import {Composition} from "remotion";
import {NexoDocumentosVideo} from "./NexoDocumentosVideo";

export const RemotionRoot = () => {
  return (
    <Composition
      id="NexoDocumentos"
      component={NexoDocumentosVideo}
      durationInFrames={450}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
