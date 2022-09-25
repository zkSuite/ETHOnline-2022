import { FileUploader } from 'react-drag-drop-files';

const fileTypes = ['JPEG', 'PNG', 'JPG'];

const Header = ({
  title,
  description,
  deadline,
  setDeadline,
  setTitle,
  setDescription,
  setImage,
}: {
  title: string;
  description: string;
  deadline: string;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setImage: (image: any) => void;
  setDeadline: (deadline: string) => void;
}) => {
  return (
    <div className="shadow-md p-4 rounded-md border-t-8 border-primary/90 bg-white">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Form Title"
        name="title"
        className="input my-3"
      />
      <textarea
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Form Description"
        className="input"
        minLength={10}
      />

      {/* <div className="input my-3 flex !p-0">
        <p className="shadow-inner h-full p-3">Deadline</p>
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          placeholder="Form Deadline"
          name="deadline"
          className="input flex-1 !border-t-0 !border-b-0 !border-r-0 !rounded-none"
        />
      </div> */}

      {/* <FileUploader
        multiple={false}
        handleChange={(img: any) => setImage(img)}
        name="file"
        types={fileTypes}
        classes="mt-4 !border-primary !max-w-full"
      /> */}
    </div>
  );
};

export default Header;
