export default function DisclaimerBanner() {
  return (
    <div className="bg-amber-50 border-b border-amber-300 px-4 py-2 text-xs text-amber-900 print:hidden">
      <strong>Clinical Decision Support Tool — For Physician Use Only.</strong>{' '}
      This tool does not replace clinical judgement and is not a certified medical device. All
      treatment decisions must be made by the responsible treating physician. Content version must
      be verified before any clinical use.
    </div>
  )
}
