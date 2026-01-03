import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
})

L.Marker.prototype.options.icon = DefaultIcon

const MapComponent = ({ coordinates, name, location }) => {
    if (!coordinates) return null

    return (
        <div className="h-[400px] w-full rounded-xl overflow-hidden shadow-lg border border-gray-200 z-0">
            <MapContainer
                center={[coordinates.latitude, coordinates.longitude]}
                zoom={6}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[coordinates.latitude, coordinates.longitude]}>
                    <Popup>
                        <div className="font-semibold text-gray-800">{name}</div>
                        <div className="text-sm text-gray-600">{location}</div>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}

export default MapComponent
