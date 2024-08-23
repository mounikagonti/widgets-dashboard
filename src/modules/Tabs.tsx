import React, {memo, useCallback, useMemo} from 'react'

interface TabProps {
  label: string
  content: React.ReactNode
  id: string
}

interface TabsProps {
  tabs: TabProps[]
  activeTabId: string
  onTabChange: (tabId: string) => void
}

const Tabs: React.FC<TabsProps> = memo(({tabs, activeTabId, onTabChange}) => {
  const handleTabClick = useCallback(
    (tabId: string) => {
      onTabChange(tabId)
    },
    [onTabChange]
  )

  const activeTabIndex = useMemo(
    () => tabs.findIndex((tab) => tab.id === activeTabId),
    [tabs, activeTabId]
  )

  const tabButtons = useMemo(
    () =>
      tabs.map((tab) => (
        <button
          key={tab.id}
          className={`px-4 py-2 ${
            tab.id === activeTabId
              ? 'border-b-2 border-blue-500 text-black'
              : 'border-b-2 border-gray-200 text-black'
          }`}
          onClick={() => handleTabClick(tab.id)}
        >
          {tab.label}
        </button>
      )),
    [tabs, activeTabId, handleTabClick]
  )

  return (
    <div>
      <div className='flex space-x-4 gap-2'>{tabButtons}</div>
      <div className='mt-4'>
        {activeTabIndex !== -1 && tabs[activeTabIndex].content}
      </div>
    </div>
  )
})

Tabs.displayName = 'Tabs'

export default Tabs
