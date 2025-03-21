import { redirect } from 'next/navigation'

const cities = [
  { name: 'Uíge', lat: -7.6117323, lon: 15.0563515 },
  { name: 'Negage', lat: -7.756449954932059, lon: 15.272969749921609 },
  { name: 'Damba', lat: -6.69199219698794, lon: 15.139439293107937 },
  { name: 'Maquela', lat: -6.053409067403904, lon: 15.106882787623066 },
  { name: 'Buengas', lat: -6.578177492387895, lon: 15.81781058263296 },
]

export default function Home() {
  // Redireciona para a primeira cidade da lista
  redirect(`/${cities[0].lat}/${cities[0].lon}`)
}
