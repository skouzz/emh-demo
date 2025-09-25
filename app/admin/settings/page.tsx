"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface SettingsData {
  companyName: string
  companyEmail: string
  phone: string
  address: string
  description: string
}

const SETTINGS_KEY = "emh_settings"

export default function AdminSettingsPage() {
  const [data, setData] = useState<SettingsData>({
    companyName: "EMH - Établissement Mohamed Hertilli",
    companyEmail: "contact@emh.tn",
    phone: "+216 00 000 000",
    address: "Tunis, Tunisie",
    description: "",
  })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SETTINGS_KEY)
      if (raw) setData(JSON.parse(raw))
    } catch {}
  }, [])

  const save = () => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(data))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Paramètres</h1>

      <Card>
        <CardHeader>
          <CardTitle>Informations de l'entreprise</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Nom de l'entreprise"
            value={data.companyName}
            onChange={(e) => setData({ ...data, companyName: e.target.value })}
          />
          <Input placeholder="Email" value={data.companyEmail} onChange={(e) => setData({ ...data, companyEmail: e.target.value })} />
          <Input placeholder="Téléphone" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} />
          <Input placeholder="Adresse" value={data.address} onChange={(e) => setData({ ...data, address: e.target.value })} />
          <Textarea placeholder="Description" value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} />
          <Button onClick={save} className="bg-emh-red hover:bg-red-700 text-white">Enregistrer</Button>
          {saved && <div className="text-green-600 text-sm">Enregistré ✔</div>}
        </CardContent>
      </Card>
    </div>
  )
} 