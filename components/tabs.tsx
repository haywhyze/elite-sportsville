import { useState } from 'react';

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
type Tab = {
  name: string;
  id: string;
  current: boolean;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Tabs({
  tabs,
  selectedTab,
  setSelectedTab,
}: {
  tabs: Tab[];
  selectedTab: Tab;
  setSelectedTab: (tab: Tab) => void;
}) {
  return (
    <div>
      <div className='sm:hidden'>
        <label htmlFor='tabs' className='sr-only'>
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id='tabs'
          name='tabs'
          className='block w-full bg-gray-900 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
          defaultValue={
            tabs.find((tab) => tab.id === selectedTab.id)?.name || ''
          }
          onChange={(e) =>
            setSelectedTab(
              tabs.find((tab) => tab.name === e.target.value) || tabs[0]
            )
          }
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className='hidden sm:block'>
        <nav className='flex space-x-2' aria-label='Tabs'>
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setSelectedTab(tab)}
              type='button'
              id={tab.id}
              className={classNames(
                tab.id === selectedTab.id
                  ? 'bg-bright-yellow text-dark-purple'
                  : 'text-gray-50 hover:bg-bright-yellow hover:text-indigo-700',
                'rounded-md px-3 py-2 text-sm font-medium'
              )}
              aria-current={tab.id === selectedTab.id ? 'page' : undefined}
            >
              <span>{tab.name}</span>
             
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
