import { useSelector } from 'react-redux' 

const Notification = () => {
  const content = useSelector(({ notification }) => notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <>
    {content && <div style={style}>
      {content}
      </div>}
    </>
  )
}

export default Notification