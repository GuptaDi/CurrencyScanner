import {
	Component,
	Input,
	Compiler,
	ElementRef,
	OnChanges,
	NgModule,
	ViewContainerRef,
	ComponentRef,
	ModuleWithComponentFactories,
	ComponentFactory,
	Type
} from '@angular/core';

import {CommonModule} from "@angular/common";

import {
	Http,
	Response,
	RequestOptionsArgs
} from '@angular/http';

import {
	MetadataHelper,
	IAnnotationMetadataHolder,
	DecoratorType
} from 'ts-metadata-helper/index';

import {IComponentRemoteTemplateFactory} from './IComponentRemoteTemplateFactory';
import {Utils} from './Utils';

const DYNAMIC_SELECTOR: string = 'DynamicComponent';

export class DynamicComponentMetadata {
	constructor(public selector: string = DYNAMIC_SELECTOR, public template: string = '') {
	}
}

export interface IComponentInputData {
	[index: string]: any;
}

@Component(new DynamicComponentMetadata())
export class DynamicComponent<TDynamicComponentType> implements OnChanges {

	@Input() componentType: {new (): TDynamicComponentType};
	@Input() componentTemplate: string;
	@Input() componentInputData: IComponentInputData;
	@Input() componentTemplateUrl: string;
	@Input() componentRemoteTemplateFactory: IComponentRemoteTemplateFactory;
	@Input() componentModules: Array<any>;

	private componentInstance: ComponentRef<TDynamicComponentType>;

	protected destroyWrapper: boolean = false;

	constructor(protected element: ElementRef,
	            protected viewContainer: ViewContainerRef,
	            protected compiler: Compiler,
	            protected http: Http) {
	}

	/**
	 * @override
	 */
	public ngOnChanges() {
		this.getComponentTypePromise().then((module: Type<any>) => {

			this.compiler.compileModuleAndAllComponentsAsync<any>(module)
				.then((moduleWithComponentFactories: ModuleWithComponentFactories<any>) => {
					if (this.componentInstance) {
						this.componentInstance.destroy();
					}
					this.componentInstance = this.viewContainer.createComponent<TDynamicComponentType>(
						// dynamicComponentClass factory is presented here
						moduleWithComponentFactories.componentFactories.find((componentFactory: ComponentFactory<Type<any>>) => {
							return componentFactory.selector === DYNAMIC_SELECTOR
								|| componentFactory.componentType === this.componentType;
						})
					);

					this.applyPropertiesToDynamicComponent(this.componentInstance.instance);

					// Remove wrapper after render the component
					if (this.destroyWrapper) {
						const el: HTMLElement = this.element.nativeElement;
						if (Utils.isPresent(el.parentNode)) {
							el.parentNode.removeChild(el);
						}
					}
				});
		});
	}

	protected getComponentTypePromise(): Promise<Type<any>> {
		return new Promise((resolve: (value: Type<any>) => void) => {
			if (Utils.isPresent(this.componentTemplate)) {
				resolve(this.makeComponentModule(this.componentTemplate));
			} else if (Utils.isPresent(this.componentTemplateUrl)) {
				this.loadRemoteTemplate(this.componentTemplateUrl, resolve);
			} else {
				resolve(this.makeComponentModule(null, this.componentType));
			}
		});
	}

	protected loadRemoteTemplate(url: string, resolve: (value: Type<any>) => void) {
		let requestArgs: RequestOptionsArgs = {withCredentials: true};
		if (Utils.isPresent(this.componentRemoteTemplateFactory)) {
			requestArgs = this.componentRemoteTemplateFactory.buildRequestOptions();
		}

		this.http.get(url, requestArgs)
			.subscribe((response: Response) => {
				if (response.status === 301 || response.status === 302) {
					const chainedUrl: string = response.headers.get('Location');

					console.info('[$DynamicComponent][loadRemoteTemplate] The URL into the chain is:', chainedUrl);
					if (Utils.isPresent(chainedUrl)) {
						this.loadRemoteTemplate(chainedUrl, resolve);
					} else {
						console.warn('[$DynamicComponent][loadRemoteTemplate] The URL into the chain is empty. The process of redirect has stopped.');
					}
				} else {
					resolve(
						this.makeComponentModule(Utils.isPresent(this.componentRemoteTemplateFactory)
							? this.componentRemoteTemplateFactory.parseResponse(response)
							: response.text())
					);
				}
			}, (response: Response) => {
				console.error('[$DynamicComponent][loadRemoteTemplate] Error response:', response);

				resolve(this.makeComponentModule(''));
			});
	}

	protected makeComponentModule(template: string, componentType?: {new (): TDynamicComponentType}): Type<any> {
		componentType = this.makeComponent(template, componentType);
		const componentModules: Array<any> = this.componentModules;
		@NgModule({
			declarations: [componentType],
			imports: [CommonModule].concat(componentModules || [])
		})
		class dynamicComponentModule {}
		return dynamicComponentModule;
	}

	protected makeComponent(template:string, componentType?:{new ():TDynamicComponentType}):Type<TDynamicComponentType> {
		let annotationsArray:Array<DecoratorType>,
			componentDecorator:DecoratorType;

		if (Utils.isPresent(componentType)) {
			annotationsArray = MetadataHelper.findAnnotationsMetaData(componentType, Component);
			if (annotationsArray.length) {
				componentDecorator = annotationsArray[0];
				Reflect.set(componentDecorator, 'selector', DYNAMIC_SELECTOR);
			}
		}

		@Component(componentDecorator || {selector: DYNAMIC_SELECTOR, template: template})
		class dynamicComponentClass {
		}
		return dynamicComponentClass as Type<TDynamicComponentType>;
	}

	protected applyPropertiesToDynamicComponent(instance:TDynamicComponentType) {
		const metadataHolder:IAnnotationMetadataHolder = MetadataHelper.findPropertyMetadata(this, Input);

		for (let property of Object.keys(this)) {
			if (Reflect.has(metadataHolder, property)) {
				if (Reflect.has(instance, property)) {
					console.warn('[$DynamicComponent][applyPropertiesToDynamicComponent] The property', property, 'will be overwritten for the component', instance);
				}
				Reflect.set(instance, property, Reflect.get(this, property));
			}
		}

		if (Utils.isPresent(this.componentInputData)) {
			for (let property in this.componentInputData) {
				if (Reflect.has(instance, property)) {
					console.warn('[$DynamicComponent][applyPropertiesToDynamicComponent] The property', property, 'will be overwritten for the component', instance);
				}

				const propValue = Reflect.get(this.componentInputData, property);
				const attributes:PropertyDescriptor = {} as PropertyDescriptor;

				if (!Utils.isFunction(propValue)) {
					attributes.set = (v) => Reflect.set(this.componentInputData, property, v);
				}
				attributes.get = () => Reflect.get(this.componentInputData, property);

				Reflect.defineProperty(instance, property, attributes);
			}
		}
	}
}
