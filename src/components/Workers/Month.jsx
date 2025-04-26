import moment from 'moment-timezone'
export const Month = ({ data }) => {
  const monthlyTotals = data.reduce((acc, goods) => {
    const month = moment(goods.createdAt).tz('Asia/Tashkent').format('MM.YYYY')
    if (!acc[month]) {
      acc[month] = { count: 0, price: 0 }
    }
    acc[month].count += parseInt(goods.count) || 0
    acc[month].price += parseInt(goods.allPrice) || 0
    return acc
  }, {})

  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden'>
      <h1 className='text-xl font-bold text-gray-800 mb-2 md:mb-1'>
        Ойлик Ҳисобот
      </h1>

      <div className='h-full w-full pb-10 overflow-x-auto'>
        <table className='w-full text-sm sm:text-base'>
          <thead className='bg-blue-600 text-white'>
            <tr>
              <th className='py-3 px-6 text-left'>Ой</th>
              <th className='py-3 px-6 text-left'>Умумий миқдор</th>
              <th className='py-3 px-6 text-left'>Умумий пул</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {Object.keys(monthlyTotals).length > 0 ? (
              Object.entries(monthlyTotals).map(([month, totals]) => (
                <tr key={month}>
                  <td className='py-2 px-6 text-gray-600'>{month}</td>
                  <td className='py-2 px-6 text-gray-600'>{totals.count}</td>
                  <td className='py-2 px-6 text-gray-600'>
                    {totals.price.toLocaleString()} cўм
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='3' className='py-4 text-center'>
                  Ҳисобот йўқ
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
