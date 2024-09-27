import HeaderText from '@/lib/ui/useable-components/header-text'
import React from 'react'

const ConfigHeader = () => {
  return (
    <div className="w-full p-3 flex-shrink-0 sticky top-0 bg-white z-10 shadow-sm">
      <div className="flex w-full justify-between">
      <HeaderText className="heading" text="Configurations" />
    </div>
    </div>
  )
}

export default ConfigHeader