import React, {
  FunctionComponent,
  MouseEventHandler,
  PropsWithChildren,
  ReactElement,
  useRef,
  useState,
} from 'react'
import styled from 'styled-components'
import useFocusWithArrows from '../../utils/hooks/useFocusWithArrows'
import { Tab, TabProps } from './Tab'
import TabButton from './TabButton'
import TabList from './TabList'

// For more information about the accessibility features of this code check out the following references:
// - https://www.w3.org/TR/wai-aria-practices-1.1/examples/tabs/tabs-2/tabs.html

const TabPanel = styled.div.attrs({
  role: 'tabpanel',
  tabIndex: 0,
})``

export interface TabsProps {
  /**
   * A descriptive label for the tabs, required for accessibility.
   */
  label: string
  /**
   * The children for the tabs, only `Tab` components are allowed.
   */
  children: ReactElement<PropsWithChildren<TabProps>, typeof Tab>[]
  /**
   * The ID of the initial active tab
   */
  initialTab?: string
}

function formatTabId(id: string) {
  return `tab-${id}`
}

function formatPanelId(id: string) {
  return `panel-${id}`
}

export const Tabs: FunctionComponent<
  TabsProps & React.HTMLAttributes<HTMLDivElement>
> = ({ label, children, initialTab, className }) => {
  const allTabs = children.map(({ props }) => props.id)
  const foundInitialTab = allTabs.find((id) => id === initialTab)
  const activeTab = foundInitialTab ?? allTabs[0] ?? ''

  if (initialTab && !foundInitialTab) {
    // eslint-disable-next-line no-console
    console.warn(
      `You passed a wrong initialTab value to Tabs component. Given initialTab ID: ${initialTab}`,
    )
  }

  const [selectedTab, setSelectedTab] = useState(activeTab)
  const tabListRef = useRef<HTMLDivElement>(null)
  const { keyDown } = useFocusWithArrows(tabListRef, true, true, true)

  return (
    <>
      <TabList
        aria-label={label}
        onKeyDown={keyDown}
        ref={tabListRef}
        className={className}
      >
        {children.map(({ props }) => {
          // See: https://github.com/typescript-eslint/typescript-eslint/issues/2715
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { id, label: tabLabel, onClick, ...otherChildrenProps } = props
          const isSelected = id === selectedTab
          const tabId = formatTabId(id)
          const panelId = formatPanelId(id)

          const onTabButtonClick: MouseEventHandler<HTMLButtonElement> = (
            // See: https://github.com/typescript-eslint/typescript-eslint/issues/2715
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            event,
          ) => {
            setSelectedTab(id)
            onClick?.(event)
          }

          return (
            <TabButton
              {...otherChildrenProps}
              key={id}
              id={tabId}
              aria-controls={panelId}
              aria-selected={isSelected}
              tabIndex={isSelected ? 0 : -1}
              onClick={onTabButtonClick}
              isSelected={isSelected}
            >
              {tabLabel}
            </TabButton>
          )
        })}
      </TabList>
      {children.map(({ props }) => {
        const isSelected = props.id === selectedTab
        const tabId = formatTabId(props.id)
        const panelId = formatPanelId(props.id)

        return (
          <TabPanel
            key={props.id}
            id={panelId}
            aria-labelledby={tabId}
            hidden={!isSelected}
          >
            {props.children}
          </TabPanel>
        )
      })}
    </>
  )
}
