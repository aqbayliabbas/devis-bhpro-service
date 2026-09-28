'use client'

import { useMemo, useState } from 'react'
import {
  ArrowRight,
  Check,
  ChevronDown,
  FileDown,
  Minus,
  Plus,
  RotateCcw,
  Sparkles,
  UserRound,
} from 'lucide-react'

type Service = {
  id: string
  category: string
  name: string
  description: string
  price: number
  unit?: string
  popular?: boolean
  startingAt?: boolean
  exclusiveGroup?: string
}

const services: Service[] = [
  { id: 'diagnostic', category: 'Stratégie & identité', name: 'Diagnostic marketing', description: 'Entretien de 45 min, audit de 2 canaux et 3 concurrents, synthèse de 5 pages et 1 retour.', price: 8800 },
  { id: 'marketing-plan', category: 'Stratégie & identité', name: 'Plan marketing sur 90 jours', description: 'Atelier, 2 cibles, positionnement, 3 canaux, actions, budget, indicateurs et PDF de 10 pages.', price: 27500 },
  { id: 'communication-strategy', category: 'Stratégie & identité', name: 'Stratégie de communication', description: 'Messages, ton, 4 axes éditoriaux et calendrier type de 4 semaines pour 2 canaux.', price: 19800 },
  { id: 'acquisition-strategy', category: 'Stratégie & identité', name: 'Stratégie acquisition', description: 'Une offre, parcours prospect, 2 audiences, plan de tests et tableau de suivi, sans exécution publicitaire.', price: 22000 },
  { id: 'logo', category: 'Stratégie & identité', name: 'Logo essentiel', description: '1 piste originale, 2 retours, versions couleur et monochrome, fichiers SVG, PDF et PNG.', price: 13200, popular: true },
  { id: 'identity', category: 'Stratégie & identité', name: 'Identité essentielle', description: '2 pistes de logo, palette, typographies, guide de 6 pages, carte de visite et 3 gabarits sociaux.', price: 30800 },
  { id: 'complete-identity', category: 'Stratégie & identité', name: 'Identité complète', description: '2 pistes, guide de 15 pages, 6 gabarits sociaux, 3 supports simples et 2 retours.', price: 55000 },
  { id: 'campaign-art-direction', category: 'Stratégie & identité', name: 'Direction artistique de campagne', description: '1 concept, 1 visuel principal et 3 adaptations, sans shooting ni achat d’images.', price: 24200 },

  { id: 'business-card', category: 'Supports commerciaux', name: 'Carte de visite', description: '1 modèle recto verso pour 1 personne, PDF prêt à imprimer et 2 retours.', price: 3300 },
  { id: 'flyer', category: 'Supports commerciaux', name: 'Flyer ou affiche', description: '1 face, 1 format, PDF prêt à imprimer, JPG et 2 retours.', price: 4400 },
  { id: 'leaflet', category: 'Supports commerciaux', name: 'Dépliant', description: '3 volets recto verso, 1 format, PDF prêt à imprimer et 2 retours.', price: 9900 },
  { id: 'catalogue', category: 'Supports commerciaux', name: 'Catalogue', description: '8 pages, 20 produits maximum, PDF écran et impression, avec 2 retours.', price: 17600 },
  { id: 'presentation', category: 'Supports commerciaux', name: 'Présentation commerciale', description: '10 diapositives, contenu fourni, fichier éditable, PDF et 2 retours.', price: 13200 },
  { id: 'packaging', category: 'Supports commerciaux', name: 'Étiquette ou packaging simple', description: '1 référence, 1 gabarit fabricant, 1 piste et 2 retours.', price: 8800 },
  { id: 'roll-up', category: 'Supports commerciaux', name: 'Roll-up', description: '1 maquette pour 1 format, PDF prêt à imprimer et 2 retours.', price: 4400 },
  { id: 'window-sign', category: 'Supports commerciaux', name: 'Vitrine ou panneau', description: '1 composition jusqu’à 3 surfaces liées, dimensions fournies et PDF d’exécution.', price: 8800 },
  { id: 'forex-wall-logo', category: 'Supports commerciaux', name: 'Logo mural Forex', description: 'Adaptation du logo, plan coté simple, fichier de découpe et 1 retour.', price: 4400 },

  { id: 'social-visual', category: 'Photo, vidéo & contenu', name: 'Visuel social', description: '1 création statique, 1 format, 1 retour et export JPG ou PNG.', price: 2200 },
  { id: 'visuals', category: 'Photo, vidéo & contenu', name: 'Lot de 10 visuels', description: 'Déclinaisons d’une direction existante, textes fournis et 1 retour groupé.', price: 13200 },
  { id: 'carousel', category: 'Photo, vidéo & contenu', name: 'Carrousel', description: 'Jusqu’à 5 slides, texte court fourni et 1 retour.', price: 4400 },
  { id: 'reel', category: 'Photo, vidéo & contenu', name: 'Montage Reel', description: 'Rushes fournis, vidéo finale de 30 s, montage simple, sous-titres et 1 retour.', price: 5500 },
  { id: 'four-reels', category: 'Photo, vidéo & contenu', name: 'Lot de 4 Reels tournés', description: '1 lieu à Béjaïa, session de 2 h, 4 vidéos de 30 s, sous-titres et 1 retour groupé.', price: 26400 },
  { id: 'product-photo', category: 'Photo, vidéo & contenu', name: 'Photo produit', description: '10 produits, 1 angle chacun, fond simple, 10 photos retouchées et 1 retour.', price: 13200 },
  { id: 'company-photo', category: 'Photo, vidéo & contenu', name: 'Photo entreprise', description: '1 lieu, séance de 2 h, 20 photos sélectionnées et retouchées.', price: 17600 },
  { id: 'interview', category: 'Photo, vidéo & contenu', name: 'Interview', description: '1 personne, tournage de 1 h, vidéo finale de 2 min, titrage et sous-titres.', price: 26400 },
  { id: 'corporate-film', category: 'Photo, vidéo & contenu', name: 'Film institutionnel léger', description: '1 lieu, demi-journée de tournage, film de 60 à 90 s, scénario simple et 2 retours.', price: 66000 },
  { id: 'advertising-video', category: 'Photo, vidéo & contenu', name: 'Vidéo publicitaire légère', description: '1 concept, 1 lieu, tournage de 2 h, vidéo de 30 s, 2 formats et 2 retours.', price: 44000 },

  { id: 'social-presence', category: 'Gestion des réseaux sociaux', name: 'Présence', description: '8 posts, 4 stories dérivées, légendes, calendrier, programmation Facebook et Instagram et bilan.', price: 19800, unit: '/ mois', popular: true, exclusiveGroup: 'social-plan' },
  { id: 'social-regular', category: 'Gestion des réseaux sociaux', name: 'Régulier', description: '12 posts, 8 stories dérivées, légendes, programmation, bilan et réunion de 30 min.', price: 30800, unit: '/ mois', exclusiveGroup: 'social-plan' },
  { id: 'social-engagement', category: 'Gestion des réseaux sociaux', name: 'Engagement', description: 'Régulier, 4 Reels montés depuis des rushes fournis et 4 h de modération.', price: 61600, unit: '/ mois', exclusiveGroup: 'social-plan' },
  { id: 'tiktok-option', category: 'Gestion des réseaux sociaux', name: 'TikTok en option', description: 'Publication de 4 vidéos déjà produites, adaptation des textes et mini-bilan.', price: 6600, unit: '/ mois' },
  { id: 'moderation-option', category: 'Gestion des réseaux sociaux', name: 'Modération en option', description: 'Jusqu’à 5 h par mois de réponses selon une FAQ validée, sur 2 comptes.', price: 11000, unit: '/ mois' },

  { id: 'meta-installation', category: 'Publicité & acquisition', name: 'Installation Meta Ads', description: '1 compte, vérification des accès, formulaire de prospects ou suivi standard et test.', price: 11000 },
  { id: 'meta-local', category: 'Publicité & acquisition', name: 'Gestion Meta locale', description: '1 offre, 1 zone, jusqu’à 2 campagnes, 4 annonces actives, suivi et bilan.', price: 16500, unit: '/ mois' },
  { id: 'meta-acquisition', category: 'Publicité & acquisition', name: 'Gestion Meta acquisition', description: 'Jusqu’à 4 campagnes, 8 annonces, 3 contrôles par semaine, 1 test créatif et réunion.', price: 27500, unit: '/ mois' },
  { id: 'meta-advanced', category: 'Publicité & acquisition', name: 'Gestion Meta avancée', description: 'Jusqu’à 6 campagnes et 12 annonces actives, retargeting, suivi et bilan hebdomadaire.', price: 44000, unit: '/ mois', startingAt: true },
  { id: 'ad-creative-pack', category: 'Publicité & acquisition', name: 'Pack créatif publicitaire', description: '3 visuels statiques, 3 accroches, 1 format chacun et 1 retour groupé.', price: 6600 },

  { id: 'landing', category: 'Sites web & e-commerce', name: 'Landing page', description: '1 page jusqu’à 6 sections, responsive, bouton WhatsApp, formulaire, SEO et mesure d’audience.', price: 33000, popular: true },
  { id: 'showcase-site', category: 'Sites web & e-commerce', name: 'Site vitrine essentiel', description: '5 pages, formulaire, SEO de base, mise à jour standard et formation de 1 h.', price: 60500 },
  { id: 'catalog-site', category: 'Sites web & e-commerce', name: 'Site catalogue', description: '5 pages institutionnelles, 30 fiches produits et demande de devis, sans panier.', price: 93500 },
  { id: 'starter-ecommerce', category: 'Sites web & e-commerce', name: 'E-commerce de démarrage', description: '20 produits, panier, paiement à la livraison, règles de livraison et formation.', price: 132000 },
  { id: 'web-maintenance', category: 'Sites web & e-commerce', name: 'Maintenance', description: 'Mises à jour, sauvegarde, contrôle mensuel et jusqu’à 2 h d’intervention standard.', price: 6600, unit: '/ mois' },
  { id: 'extra-page', category: 'Sites web & e-commerce', name: 'Page supplémentaire', description: 'Structure existante, texte et images fournis, jusqu’à 6 sections.', price: 6600 },
  { id: 'ten-products', category: 'Sites web & e-commerce', name: 'Ajout de 10 produits simples', description: 'Import depuis un fichier propre avec photos fournies.', price: 6600 },

  { id: 'functional-scoping', category: 'CRM & applications métier', name: 'Cadrage fonctionnel', description: '2 ateliers, parcours, priorités, écrans schématiques, critères de réception et estimation.', price: 27500 },
  { id: 'crm-existing-tool', category: 'CRM & applications métier', name: 'CRM sur outil existant', description: '1 pipeline, 5 utilisateurs, 10 champs, 500 contacts et formation de 2 h.', price: 66000 },
  { id: 'simple-dashboard', category: 'CRM & applications métier', name: 'Dashboard simple', description: '1 source CSV propre, 6 indicateurs, filtres de dates et 1 page.', price: 49500 },
  { id: 'simple-automation', category: 'CRM & applications métier', name: 'Automatisation simple', description: '1 déclencheur, 2 outils, 3 actions, journal d’erreurs et test.', price: 33000 },
  { id: 'stock-management', category: 'CRM & applications métier', name: 'Gestion de stock sur outil existant', description: '1 dépôt, 5 utilisateurs, 500 articles, entrées, sorties et formation.', price: 99000 },
  { id: 'booking-system', category: 'CRM & applications métier', name: 'Réservation sur outil existant', description: '1 établissement, 3 ressources, 1 calendrier et notification standard.', price: 66000 },
  { id: 'custom-app', category: 'CRM & applications métier', name: 'Application sur mesure initiale', description: '1 processus, 2 rôles, jusqu’à 5 écrans, export CSV et tests convenus.', price: 275000, startingAt: true },
  { id: 'technical-support', category: 'CRM & applications métier', name: 'Support technique mensuel', description: 'Jusqu’à 4 h, suivi des demandes et petites corrections hors garantie.', price: 13200, unit: '/ mois' },

  { id: 'pack-local-launch', category: 'Packs', name: 'Lancement local', description: 'Logo essentiel, carte de visite, flyer et mise en place sociale.', price: 25300 },
  { id: 'pack-local-presence', category: 'Packs', name: 'Présence locale', description: 'Forfait Présence, sans modération ni vidéo. Mise en place séparée au premier mois.', price: 19800, unit: '/ mois' },
  { id: 'pack-local-acquisition', category: 'Packs', name: 'Acquisition locale', description: 'Présence et gestion Meta locale. Mises en place sociale et Meta séparées au départ.', price: 34100, unit: '/ mois' },
  { id: 'pack-commerce-content', category: 'Packs', name: 'Contenu commerce', description: 'Présence et 4 Reels tournés, programmés sur Facebook et Instagram.', price: 44000, unit: '/ mois' },
  { id: 'pack-web-launch', category: 'Packs', name: 'Lancement web', description: 'Identité essentielle et site vitrine essentiel, avec tous les livrables des deux offres.', price: 86900 },
]

const categories = ['Tous', ...Array.from(new Set(services.map((service) => service.category)))]
const formatPrice = (value: number) => `${new Intl.NumberFormat('fr-FR').format(value)} DA`
const formatServicePrice = (service: Service) => `${service.startingAt ? 'Dès ' : ''}${formatPrice(service.price)}`

export default function Page() {
  const [activeCategory, setActiveCategory] = useState('Tous')
  const [selected, setSelected] = useState<Record<string, number>>({})
  const [clientName, setClientName] = useState('')
  const [company, setCompany] = useState('')
  const [showAll, setShowAll] = useState(false)

  const visibleServices = services.filter((service) => activeCategory === 'Tous' || service.category === activeCategory)
  const selectedLines = services.filter((service) => selected[service.id])
  const subtotal = selectedLines.reduce((sum, service) => sum + service.price * selected[service.id], 0)
  const hasStartingAtPrice = selectedLines.some((service) => service.startingAt)
  const setupFee = selectedLines.some((service) => service.category === 'Gestion des réseaux sociaux') ? 6600 : 0
  const total = subtotal + setupFee
  const quoteNumber = `BH-${new Date().getFullYear()}-024`

  const toggleService = (id: string) => {
    setSelected((current) => {
      const next = { ...current }
      const service = services.find((item) => item.id === id)

      if (next[id]) {
        delete next[id]
      } else {
        if (service?.exclusiveGroup) {
          services
            .filter((item) => item.exclusiveGroup === service.exclusiveGroup && item.id !== id)
            .forEach((item) => delete next[item.id])
        }
        next[id] = 1
      }

      return next
    })
  }

  const changeQuantity = (id: string, delta: number) => {
    setSelected((current) => {
      const next = { ...current, [id]: Math.max(0, (current[id] || 0) + delta) }
      if (!next[id]) delete next[id]
      return next
    })
  }

  const reset = () => {
    setSelected({})
    setClientName('')
    setCompany('')
  }

  const hasQuote = useMemo(() => selectedLines.length > 0, [selectedLines.length])

  return (
    <>
      <div className="print-quote">
        <div className="print-quote__heading">
          <div><strong>BHPRO Studio</strong><span>Studio créatif & digital</span></div>
          <div><strong>DEVIS {quoteNumber}</strong><span>Émis le {new Intl.DateTimeFormat('fr-FR').format(new Date())}</span></div>
        </div>
        <div className="print-quote__client"><div><small>CLIENT</small><strong>{clientName || 'À compléter'}</strong><span>{company || 'Particulier / entreprise'}</span></div><div><small>VALIDITÉ</small><strong>30 jours</strong><span>Prix exprimés en dinars algériens</span></div></div>
        <table className="print-quote__table"><thead><tr><th>PRESTATION</th><th>DESCRIPTION</th><th>QTÉ</th><th>UNITÉ</th><th>TOTAL</th></tr></thead><tbody>{selectedLines.map((service) => <tr key={service.id}><td><strong>{service.name}</strong><span>{service.category}</span></td><td>{service.description}</td><td>{selected[service.id]}</td><td>{formatServicePrice(service)}</td><td><strong>{service.startingAt ? 'Dès ' : ''}{formatPrice(service.price * selected[service.id])}</strong></td></tr>)}{setupFee > 0 && <tr><td><strong>Mise en place réseaux sociaux</strong><span>Frais de lancement</span></td><td>Configuration initiale et préparation du calendrier éditorial.</td><td>1</td><td>{formatPrice(setupFee)}</td><td><strong>{formatPrice(setupFee)}</strong></td></tr>}</tbody></table>
        <div className="print-quote__bottom"><div className="print-quote__note"><strong>Conditions</strong><p>Cette estimation est indicative. Le périmètre final, les délais et les modalités de paiement seront confirmés après échange.</p><p>Les achats externes, frais média et impressions ne sont pas inclus.</p></div><div className="print-quote__total"><span>Total estimatif{hasStartingAtPrice ? ' minimum' : ''} HT</span><strong>{hasStartingAtPrice ? 'Dès ' : ''}{formatPrice(total)}</strong><small>TVA éventuelle non incluse</small></div></div>
      </div>
      <main className="min-h-screen bg-[#f7f8f6] text-[#18312d]">
      <header className="border-b border-[#dce5e1] bg-white/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-[#18312d] text-sm font-bold text-[#d7f45d]">BH</div>
            <div><p className="text-sm font-bold tracking-[0.2em]">BHPRO</p><p className="text-xs text-[#71827d]">Studio créatif & digital</p></div>
          </div>
          <div className="hidden items-center gap-8 text-sm text-[#71827d] md:flex"><span>Nos prestations</span><span>Comment ça marche</span><span className="rounded-full bg-[#eff5ed] px-4 py-2 font-semibold text-[#18312d]">Béjaïa · Algérie</span></div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 pb-8 pt-14 lg:px-10 lg:pt-20">
        <div className="max-w-3xl"><div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#e9f2df] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#547025]"> Devis personnalisé</div><h1 className="text-4xl font-semibold leading-[1.05] tracking-[-0.04em] md:text-6xl">Construisons quelque chose de <span className="text-[#759b27]">remarquable.</span></h1><p className="mt-5 max-w-2xl text-base leading-7 text-[#71827d] md:text-lg">Sélectionnez vos besoins, ajustez les quantités et obtenez une estimation claire en quelques clics. Les prix sont exprimés en dinars algériens, hors achats externes.</p></div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 pb-20 lg:grid-cols-[1fr_390px] lg:px-10">
        <div>
          <div className="mb-5 flex flex-wrap items-center gap-2">{categories.map((category) => <button key={category} onClick={() => setActiveCategory(category)} className={`rounded-full border px-4 py-2 text-sm transition ${activeCategory === category ? 'border-[#18312d] bg-[#18312d] text-white' : 'border-[#dce5e1] bg-white text-[#71827d] hover:border-[#9db7ae]'}`}>{category}</button>)}</div>
          <div className="flex flex-col gap-8">
            {(activeCategory === 'Tous' ? categories.slice(1) : [activeCategory]).map((category) => {
              const categoryServices = visibleServices.filter((service) => service.category === category)
              if (categoryServices.length === 0) return null

              return <section key={category} aria-labelledby={`category-${category}`}>
                <div className="mb-3 flex items-end justify-between gap-4">
                  <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#759b27]">Service</p><h2 id={`category-${category}`} className="mt-1 text-xl font-semibold tracking-tight">{category}</h2></div>
                  <span className="text-xs text-[#9aa9a4]">{categoryServices.length} prestation{categoryServices.length > 1 ? 's' : ''}</span>
                </div>
                <div className="grid gap-3">
                  {categoryServices.map((service) => {
                    const quantity = selected[service.id] || 0
                    return <article key={service.id} className={`rounded-2xl border bg-white p-5 transition ${quantity ? 'border-[#a2bf63] ring-2 ring-[#dcebb8]' : 'border-[#dce5e1]'}`}><div className="flex items-start justify-between gap-4"><div className="flex gap-4"><button onClick={() => toggleService(service.id)} aria-label={`${quantity ? 'Retirer' : 'Ajouter'} ${service.name}`} className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md border ${quantity ? 'border-[#759b27] bg-[#759b27] text-white' : 'border-[#cbd8d3] bg-white'}`}>{quantity > 0 && <Check className="size-4" />}</button><div><div className="flex flex-wrap items-center gap-2"><h3 className="font-semibold">{service.name}</h3>{service.popular && <span className="rounded-full bg-[#f0f7d5] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#668624]">Populaire</span>}</div><p className="mt-1 max-w-xl text-sm leading-6 text-[#71827d]">{service.description}</p></div></div><div className="shrink-0 text-right"><p className="font-semibold">{formatServicePrice(service)}</p><p className="text-xs text-[#9aa9a4]">{service.unit || 'forfait'}</p></div></div>{quantity > 0 && <div className="mt-4 flex items-center justify-between border-t border-[#edf1ef] pt-3 pl-10"><span className="text-xs font-medium text-[#71827d]">Quantité</span><div className="flex items-center gap-3 rounded-lg border border-[#dce5e1] px-1 py-1"><button onClick={() => changeQuantity(service.id, -1)} className="flex size-7 items-center justify-center rounded-md hover:bg-[#f0f5f2]" aria-label="Diminuer"><Minus className="size-3.5" /></button><span className="min-w-5 text-center text-sm font-semibold">{quantity}</span><button onClick={() => changeQuantity(service.id, 1)} className="flex size-7 items-center justify-center rounded-md hover:bg-[#f0f5f2]" aria-label="Augmenter"><Plus className="size-3.5" /></button></div></div>}</article>
                  })}
                </div>
              </section>
            })}
          </div>
        </div>

        <aside className="h-fit rounded-3xl bg-[#18312d] p-6 text-white shadow-xl shadow-[#18312d]/10 lg:sticky lg:top-6"><div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#b8d765]">Votre estimation</p><h2 className="mt-2 text-2xl font-semibold">Devis sur mesure</h2></div><button onClick={reset} className="rounded-lg p-2 text-[#9bb5ad] hover:bg-white/10 hover:text-white" aria-label="Réinitialiser"><RotateCcw className="size-4" /></button></div><div className="my-6 h-px bg-white/10" />
          <div className="flex flex-col gap-5"><label className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5"><UserRound className="size-4 text-[#b8d765]" /><input value={clientName} onChange={(event) => setClientName(event.target.value)} placeholder="Votre nom" className="w-full bg-transparent text-sm outline-none placeholder:text-[#78918a]" /></label><input value={company} onChange={(event) => setCompany(event.target.value)} placeholder="Nom de votre entreprise (optionnel)" className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none placeholder:text-[#78918a]" /></div>
          <div className="my-6 flex flex-col gap-3">{selectedLines.length === 0 ? <div className="rounded-xl border border-dashed border-white/20 px-4 py-7 text-center text-sm text-[#9bb5ad]">Votre devis apparaîtra ici<br />au fur et à mesure de votre sélection.</div> : <>{selectedLines.slice(0, showAll ? undefined : 3).map((service) => <div key={service.id} className="flex justify-between gap-3 text-sm"><span className="text-[#d5e0dc]">{service.name} <span className="text-[#8ca39b]">× {selected[service.id]}</span></span><span className="shrink-0 font-medium">{service.startingAt ? 'Dès ' : ''}{formatPrice(service.price * selected[service.id])}</span></div>)}{selectedLines.length > 3 && <button onClick={() => setShowAll(!showAll)} className="flex items-center gap-1 text-left text-xs text-[#b8d765]">{showAll ? 'Réduire' : `Voir les ${selectedLines.length} prestations`}<ChevronDown className={`size-3 transition ${showAll ? 'rotate-180' : ''}`} /></button>}{setupFee > 0 && <div className="flex justify-between gap-3 text-sm"><span className="text-[#d5e0dc]">Mise en place réseaux sociaux</span><span className="font-medium">{formatPrice(setupFee)}</span></div>}</> }</div>
          <div className="border-t border-white/10 pt-5"><div className="flex items-end justify-between"><div><p className="text-xs text-[#9bb5ad]">Total estimatif{hasStartingAtPrice ? ' minimum' : ''}</p><p className="mt-1 text-3xl font-semibold tracking-tight">{hasStartingAtPrice ? 'Dès ' : ''}{formatPrice(total)}</p></div><span className="rounded-full bg-[#b8d765] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#18312d]">HT</span></div></div>
          <button onClick={() => hasQuote && window.print()} disabled={!hasQuote} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#b8d765] px-4 py-3.5 text-sm font-bold text-[#18312d] transition hover:bg-[#d0ea83] disabled:cursor-not-allowed disabled:opacity-40"><FileDown className="size-4" /> Télécharger mon devis <ArrowRight className="size-4" /></button><p className="mt-3 text-center text-[11px] leading-5 text-[#78918a]">Estimation indicative. Le devis final sera confirmé après échange sur votre projet.</p>
        </aside>
      </section>
      <footer className="border-t border-[#dce5e1] bg-white"><div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-xs text-[#71827d] md:flex-row md:items-center md:justify-between lg:px-10"><span>© 2026 BHPRO Studio · Béjaïa, Algérie</span><span>Prix en DA · Hors taxes éventuelles et achats externes</span></div></footer>
      </main>
      <style jsx global>{`
        .print-quote { display: none; }
        @media print {
          @page { size: A4; margin: 12mm 13mm; }
          html, body { width: auto; height: auto; margin: 0; background: #fff !important; }
          main { display: none !important; }
          .print-quote { display: block; box-sizing: border-box; width: 100%; color: #18312d; background: #fff; font-family: Arial, sans-serif; print-color-adjust: exact; -webkit-print-color-adjust: exact; }
          .print-quote *, .print-quote *::before, .print-quote *::after { box-sizing: border-box; }
          .print-quote__heading, .print-quote__client, .print-quote__bottom { display: flex; break-inside: avoid; page-break-inside: avoid; }
          .print-quote__heading { justify-content: space-between; align-items: flex-start; padding-bottom: 4mm; border-bottom: 1px solid #dce5e1; }
          .print-quote__heading > div:last-child { text-align: right; }
          .print-quote__heading strong, .print-quote__heading span { display: block; }
          .print-quote__heading strong { font-size: 11px; letter-spacing: .06em; }
          .print-quote__heading span { margin-top: 3px; color: #71827d; font-size: 8px; }
          .print-quote__client small { color: #759b27; font-weight: 700; font-size: 9px; letter-spacing: .14em; }
          .print-quote__client { gap: 30mm; padding: 4mm 0; border-bottom: 1px solid #edf1ef; }
          .print-quote__client > div { min-width: 55mm; }
          .print-quote__client strong, .print-quote__client span { display: block; margin-top: 5px; font-size: 11px; }
          .print-quote__client span { color: #71827d; font-size: 10px; }
          .print-quote__table { width: 100%; margin-top: 5mm; border-collapse: collapse; font-size: 9px; }
          .print-quote__table thead { display: table-header-group; }
          .print-quote__table tfoot { display: table-footer-group; }
          .print-quote__table tr { break-inside: avoid; page-break-inside: avoid; }
          .print-quote__table th { padding: 0 6px 7px; border-bottom: 2px solid #18312d; text-align: left; color: #71827d; font-size: 7.5px; letter-spacing: .1em; }
          .print-quote__table th:nth-child(n+3), .print-quote__table td:nth-child(n+3) { text-align: right; }
          .print-quote__table td { padding: 7px 6px; border-bottom: 1px solid #edf1ef; vertical-align: top; }
          .print-quote__table td strong, .print-quote__table td span { display: block; }
          .print-quote__table td span { margin-top: 2px; color: #759b27; font-size: 8px; }
          .print-quote__table td:nth-child(2) { width: 42%; color: #71827d; line-height: 1.3; }
          .print-quote__bottom { justify-content: space-between; align-items: flex-start; gap: 18mm; padding-top: 7mm; }
          .print-quote__note { max-width: 95mm; color: #71827d; font-size: 9px; line-height: 1.5; }
          .print-quote__note strong { color: #18312d; font-size: 10px; }
          .print-quote__note p { margin: 6px 0 0; }
          .print-quote__total { min-width: 55mm; padding: 4mm; border-radius: 8px; background: #eff5ed; }
          .print-quote__total span, .print-quote__total small { display: block; color: #71827d; font-size: 9px; }
          .print-quote__total strong { display: block; margin: 5px 0; font-size: 21px; }
        }
      `}</style>
    </>
  )
}
