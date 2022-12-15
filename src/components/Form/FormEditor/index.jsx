import { CKEditor } from '@ckeditor/ckeditor5-react';
import React, { useState } from 'react';
import ModalDAMComponent from 'components/ModalDamComponent';
import { Icon } from '@iconify/react';
import styles from './index.module.scss';
import ClassicEditor from 'ckeditor/build/ckeditor';

const Editor = ({ field }) => {
  const [editor, setEditor] = useState('');
  const [show, setShow] = useState(false);

  const onSelect = (data) => {
    editor.model.change(() => {
      const imgTag = `<img  src="${data[0]?.url}" alt="${data[0]?.basename}"></img>`;
      const viewFragment = editor.data.processor.toView(imgTag);
      const modelFragment = editor.data.toModel(viewFragment);
      editor.model.insertContent(modelFragment);
    });
    setShow(false);
  };

  return (
    <div key={field.key} className="position-relative">
      <p
        onClick={() => setShow(true)}
        className={`${styles['image-upload-button']} position-absolute bottom-0 end-0 zindex-1 mb-0 cursor-pointer`}
      >
        <Icon width={20} height={20} className="text-black" icon="ion:image-outline" />
      </p>
      <ModalDAMComponent show={show} onHide={() => setShow(false)} onSelect={onSelect} />
      <CKEditor
        editor={ClassicEditor}
        data={field?.value ?? ''}
        onReady={(editor) => {
          setEditor(editor);
          editor.editing.view.change((writer) => {
            writer.setStyle(
              { 'max-height': '500px', 'min-height': '200px', 'padding-bottom': '20px' },
              editor.editing.view.document.getRoot()
            );
          });
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          field.changed(data);
        }}
      />
    </div>
  );
};

export default Editor;
