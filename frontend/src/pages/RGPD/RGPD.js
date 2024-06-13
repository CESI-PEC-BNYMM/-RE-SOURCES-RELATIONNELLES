import React from 'react';
import { sanitize } from 'dompurify';
import './RGPD.css';

const RGPD = () => {
    const articles = [
        {
            id: 1,
            title: 'Article 1 : Préambule',
            sub_article: [],
            paragraphs: [
                {
                    content: "La présente politique de confidentialité a pour but d’informer les utilisateurs du site :",
                    li: [
                        "Sur la manière dont sont collectées leurs données personnelles. Sont considérées comme des données personnelles, toute information permettant d’identifier un utilisateur. A ce titre, il peut s’agir : de ses noms et prénoms, de son âge, de son adresse postale ou email, de sa localisation ou encore de son adresse IP (liste non-exhaustive) ;",
                        "Sur les droits dont ils disposent concernant ces données ;",
                        "Sur la personne responsable du traitement des données à caractère personnel collectées et traitées ;",
                        "Sur les destinataires de ces données personnelles ;",
                        "Sur la politique du site en matière de cookies.",
                    ]
                },
            ],
        },
        {
            id: 2,
            title: 'Article 2 : Principes relatifs à la collecte et au traitement des données personnelles',
            sub_article: [],
            paragraphs: [
                {
                    content: "Conformément à l’article 5 du Règlement européen 2016/679, les données à caractère personnel sont :",
                    li: [
                        "Traitées de manière licite, loyale et transparente au regard de la personne concernée ;",
                        "Collectées pour des finalités déterminées (cf. Article 3.1 des présentes), explicites et légitimes, et ne pas être traitées ultérieurement d'une manière incompatible avec ces finalités ;",
                        "Adéquates, pertinentes et limitées à ce qui est nécessaire au regard des finalités pour lesquelles elles sont traitées ;",
                        "Exactes et, si nécessaire, tenues à jour. Toutes les mesures raisonnables doivent être prises pour que les données à caractère personnel qui sont inexactes, eu égard aux finalités pour lesquelles elles sont traitées, soient effacées ou rectifiées sans tarder ;",
                        "Conservées sous une forme permettant l'identification des personnes concernées pendant une durée n'excédant pas celle nécessaire au regard des finalités pour lesquelles elles sont traitées ;",
                        "Traitées de façon à garantir une sécurité appropriée des données collectées, y compris la protection contre le traitement non autorisé ou illicite et contre la perte, la destruction ou les dégâts d'origine accidentelle, à l'aide de mesures techniques ou organisationnelles appropriées.",
                    ]
                },
                {
                    content: "Le traitement n'est licite que si, et dans la mesure où, au moins une des conditions suivantes est remplie :",
                    li: [
                        "La personne concernée a consenti au traitement de ses données à caractère personnel pour une ou plusieurs finalités spécifiques ;",
                        "Le traitement est nécessaire à l'exécution d'un contrat auquel la personne concernée est partie ou à l'exécution de mesures précontractuelles prises à la demande de celle-ci ;",
                        "Le traitement est nécessaire au respect d'une obligation légale à laquelle le responsable du traitement est soumis ;",
                        "Le traitement est nécessaire à la sauvegarde des intérêts vitaux de la personne concernée ou d'une autre personne physique ;",
                        "Le traitement est nécessaire à l'exécution d'une mission d'intérêt public ou relevant de l'exercice de l'autorité publique dont est investi le responsable du traitement ;",
                        "Le traitement est nécessaire aux fins des intérêts légitimes poursuivis par le responsable du traitement ou par un tiers, à moins que ne prévalent les intérêts ou les libertés et droits fondamentaux de la personne concernée qui exigent une protection des données à caractère personnel, notamment lorsque la personne concernée est un enfant.",
                    ]
                },
            ],
        },
        {
            id: 3,
            title: 'Article 3 : Données à caractère personnel collectées et traitées dans le cadre de la navigation sur le site',
            sub_article: [
                {
                    id: 1,
                    title: 'Article 3.1 : Données collectées',
                    paragraphs: [
                        {
                            content: "Les données personnelles collectées dans le cadre de notre activité sont les suivantes :",
                            li: [
                                "[Listez les données collectées lors de l’utilisation du site]",
                            ]
                        },
                        {
                            content: "La collecte et le traitement de ces données répond à la (aux) finalité(s) suivante(s) :",
                            li: [
                                "[Préciser la/les raison(s) pour laquelle/lesquelles la collecte de données personnelles est nécessaire dans le cadre de votre activité]<br />exemple : gestion de contrat, gestion de l’espace client, suivi de la qualité des services, envoi de newsletter, etc.",
                            ]
                        },
                    ],
                },
                {
                    id: 2,
                    title: 'Article 3.2 : Mode de collecte des données',
                    paragraphs: [
                        {
                            content: "Lorsque vous utilisez notre site, sont automatiquement collectées les données suivantes :",
                            li: [
                                "[Liste des données automatiquement collectées lors de la simple visite de l’utilisateur sur le site]",
                            ]
                        },
                        {
                            content: "D’autres données personnelles sont collectées lorsque vous effectuez les opérations suivantes sur la plateforme :",
                            li: [
                                "[Lister les données personnelles collectées, et préciser la finalité de la collecte]",
                            ]
                        },
                        {
                            content: "Elles sont conservées par le responsable du traitement dans des conditions raisonnables de sécurité, pour une durée de 3 ans",
                            li: []
                        },
                        {
                            content: "La société est susceptible de conserver certaines données à caractère personnel au-delà des délais annoncés ci-dessus afin de remplir ses obligations légales ou réglementaires.",
                            li: []
                        },
                    ],
                },
                {
                    id: 3,
                    title: 'Article 3.3 : Hébergement des données',
                    paragraphs: [
                        {
                            content: "Le site [nom du site web] est hébergé par : [Dénomination sociale de l’entreprise]",
                            li: []
                        },
                        {
                            content: "<a href='https://maps.app.goo.gl/DsjRQKEnHWddksF68' target='_blank' rel='noreferrer'>93 Bd de la Seine, 92000 Nanterre</a><br /><a href='tel:0155178000'>01 55 17 80 00</a>",
                            li: []
                        },
                    ],
                },
            ],
            paragraphs: [],
        },
        {
            id: 4,
            title: 'Article 4 : Les droits de l’utilisateur en matière de collecte et de traitement des données',
            sub_article: [],
            paragraphs: [
                {
                    content: "Tout utilisateur concerné par le traitement de ses données personnelles peut se prévaloir des droits suivants, en application du règlement européen 2016/679 et de la Loi Informatique et Liberté (Loi 78-17 du 6 janvier 1978) :",
                    li: [
                        "Droit d’accès, de rectification et droit à l’effacement des données (posés respectivement aux articles 15, 16 et 17 du RGPD) ;",
                        "Droit à la portabilité des données (article 20 du RGPD) ;",
                        "Droit à la limitation (article 18 du RGPD) et à l’opposition du traitement des données (article 21 du RGPD) ;",
                        "Droit de ne pas faire l’objet d’une décision fondée exclusivement sur un procédé automatisé ;",
                        "Droit de déterminer le sort des données après la mort ;",
                        "Droit de saisir l’autorité de contrôle compétente (article 77 du RGPD).",
                    ]
                },
                {
                    content: "Pour exercer vos droits, veuillez adresser votre courrier à CESI Nanterre ou par numéro de téléphone <a href='tel:0155178000'>01 55 17 80 00</a>.",
                    li: []
                },
                {
                    content: "Afin que le responsable du traitement des données puisse faire droit à sa demande, l’utilisateur peut être tenu de lui communiquer certaines informations telles que : ses noms et prénoms, son adresse e-mail ainsi que son numéro de compte, d’espace personnel ou d’abonné.",
                    li: []
                },
                {
                    content: "<b>Consultez le site cnil.fr pour plus d’informations sur vos droits.</b>",
                    li: []
                },
            ],
        },
        {
            id: 5,
            title: 'Article 5 : Conditions de modification de la politique de confidentialité',
            sub_article: [],
            paragraphs: [
                {
                    content: "L’éditeur du site [Nom du site] se réserve le droit de pouvoir modifier la présente Politique à tout moment afin d’assurer aux utilisateurs du site sa conformité avec le droit en vigueur.",
                    li: []
                },
                {
                    content: "L’utilisateur est invité à prendre connaissance de cette Politique à chaque fois qu’il utilise nos services, sans qu’il soit nécessaire de l’en prévenir formellement.",
                    li: []
                },
                {
                    content: "La présente politique, éditée le [date de mise en ligne], a été mise à jour le [date de modification de la politique].",
                    li: []
                },
            ],
        },
    ];

    return (
        <div className="Content">
            <h4 className='mb-4'>Règlement Général de Protection des Données</h4>
            <div className='RGPD'>
                {articles.map((article, index) => (
                    <div key={index}>
                        <h5>{article.title}</h5>
                        {article.paragraphs.map((paragraph, index) => (
                            <div key={index}>
                                <p dangerouslySetInnerHTML={{ __html: sanitize(paragraph.content) }}></p>
                                <ul>
                                    {paragraph.li.map((li, index) => (
                                        <li key={index}><p dangerouslySetInnerHTML={{ __html: sanitize(li) }}></p></li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                        {article.sub_article.map((sub_article, index) => (
                            <div key={index}>
                                <h6>{sub_article.title}</h6>
                                {sub_article.paragraphs.map((paragraph, index) => (
                                    <div key={index}>
                                        <p dangerouslySetInnerHTML={{ __html: sanitize(paragraph.content) }}></p>
                                        <ul>
                                            {paragraph.li.map((li, index) => (
                                                <li key={index}><p dangerouslySetInnerHTML={{ __html: sanitize(li) }}></p></li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RGPD;
