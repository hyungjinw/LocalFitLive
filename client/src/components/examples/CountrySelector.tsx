import { CountrySelector } from '../CountrySelector'

export default function CountrySelectorExample() {
  return (
    <div className="p-8 bg-background">
      <CountrySelector onSelect={(country) => console.log('Selected:', country)} />
    </div>
  )
}
