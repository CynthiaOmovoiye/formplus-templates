import React from 'react';
const Alink = ({ url, title }) => (
    <a href={url} target="_blank" rel="noreferrer">
      {title}
    </a>
  );
function Template({
    template: { name, description, created, link },
}) {
  return <div className="rounded overflow-hidden shadow-3xl relative flex flex-col h-48">
  <div className="px-6 py-4 h-full">
    <div className="font-bold text-xl mb-2 text-neutral-100" id='name'>{name}</div>
    <p className="text-neutral-50 text-base" id='desc'>
      {description}
    </p>

  </div>
  <button className="bg-neutral-0 hover:bg-gray-100 text-light-green font-bold py-2 px-4 rounded inline-flex items-center">
    <span> <Alink url={`${link}`} title='Use Template' /> </span>
  </button>
</div>;
}

export default Template;
