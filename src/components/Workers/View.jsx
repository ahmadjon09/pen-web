export const ViewModal = ({ data }) => {
  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden'>
      <div className='h-full w-full pb-10 overflow-x-auto'>
        <table className='w-full text-sm sm:text-base'>
          <thead className='bg-blue-600 text-white'>
            <tr>
              <th className='py-3 px-6 text-left'>Товар тури</th>
              <th className='py-3 px-6 text-left'>Сони</th>
              <th className='py-3 px-6 text-left'>Юклаш</th>
              <th className='py-3 px-6 text-left'>Жами пул</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td className='py-2 px-6 text-gray-600'>
                    {item.type.toLocaleString()}
                  </td>
                  <td className='py-2 px-6 text-gray-600'>
                    {item.load.toLocaleString()}
                  </td>
                  <td className='py-2 px-6 text-gray-600'>
                    {item.count.toLocaleString()}
                  </td>
                  <td className='py-2 px-6 text-gray-600'>
                    {item.allPrice ? item.allPrice.toLocaleString() : '-'} cўм
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='3' className='py-4 text-center'>
                  Маълумот йўқ
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
