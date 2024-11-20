import Card from "../components/shared/Card"
import { Link } from "react-router-dom"

function AboutPage() {
  return (
   <Card>
    <div className="about">
      <h1>About This Project</h1>
      <p>this is is a feedback app</p>
      <p>version 1.0.0</p>
      <p>
        <Link to='/'>
        Back to home
        </Link>
      </p>
    </div>
   </Card>
  )
}

export default AboutPage
